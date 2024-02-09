import { getAuth } from 'firebase/auth';
import { collection, setDoc, query, getDocs, doc, addDoc, getDoc, deleteDoc, orderBy, getCountFromServer, limit, where, Timestamp } from 'firebase/firestore';
import { db } from './FirestoreConfig';
import { ref as storageRef, deleteObject } from 'firebase/storage';
import { storage } from './FirestoreConfig';


// const getUser = async (id) => {
//     const userRef = doc(db, 'users', id);
//     const userSnapshot = await getDoc(userRef);
//     return userSnapshot;
// }

export async function getUsers(searchTerm) {
    if (!searchTerm) {
        return [];
    }

    const words = searchTerm.split(' ');


    if (words.length < 2) {
        return;
    }

    const q = query(collection(db, 'users'), where('name', '==', words[0]), where('surname', '==', words[1]))
    const usersSnapshot = await getDocs(q);
    const usersList = usersSnapshot.docs.map(doc => {
        const data = doc.data();

        return {
            ...data,
            id: doc.id
        }

    });

    return usersList;
}

export async function getUserInfo(userId = '1') {
    if (!userId) {
        return;
    }

    const docRef = doc(db, 'users', userId)
    const docSnapshot = await getDoc(docRef);

    const data = docSnapshot.data();

    return {
        id: userId,
        ...data
    }
}

export async function createUserInfo({userId = '1', content}) {
    const userRef = doc(db, 'users', userId)
    await setDoc(userRef, content, {merge: true});
    return userId;
}

export async function getAllContent({userId, contentType, contentLimit}) {

    if (!userId) {
        return;
    }

    let q;

    if (contentLimit) {
        q = query(collection(db, 'users', userId, contentType), orderBy('time', 'desc'), limit(contentLimit));
    } else if (contentType !== 'friends') {
        q = query(collection(db, 'users', userId, contentType), orderBy('time', 'desc'));
    } else {
        q = query(collection(db, 'users', userId, contentType));
    }

    const docSnapshot = await getDocs(q);
    const docList = docSnapshot.docs.map(doc => {
        const data = doc.data();

        if (data.time) {

            const milliseconds = data.time.seconds * 1000;
            const dateObject = new Date(milliseconds);
            const time = dateObject.toLocaleString();

            return {
                ...data,
                id: doc.id,
                time
            };
        }

        return {
            ...data,
            id: doc.id
        };
    })
    return docList;
};

export async function getContent({userId, contentType, contentId}) {
    if (!userId) {
        return;
    }

    const docRef = doc(db, 'users', userId, contentType, contentId)
    const docSnapshot = await getDoc(docRef);

    const data = docSnapshot.data();

    return {
        ...data,
        id: data.id,
        time: new Date(data.time.seconds * 1000).toLocaleString()
    }
};


export async function createContent({userId, contentType, content}) {
    console.log('Content: ' + contentType, content);
    const contentCol = collection(db, 'users', userId, contentType);
    const docRef = await addDoc(contentCol, content);
    return {
        id: docRef.id,
        ...content,
        time: content.time.toDate().toLocaleString()
    };
};

export async function deleteContent({userId, contentType, id}) {
    // Возвращает undefined при успехе
    // Сделать проверку на удаление
    await deleteDoc(doc(db, 'users', userId, contentType, id));

    return id;
}

export async function deleteContentFiles({userId, contentType, contentIdArr}) {
    if (contentIdArr.length > 0) {
        contentIdArr.forEach(item => {
            const contentRef = storageRef(storage, `users/${userId}/${contentType}/${item.imageId}.jpg`);
            deleteObject(contentRef)
            .then(() => {
                console.log('Deleting successfully!')
            })
            .catch((e) => {
                console.log('Deleting Error!');
                console.log(e.message);
            })
        })
    }
    return contentIdArr;
}

export async function getDocCount({userId, contentType = ''}) {
    if (!userId) {
        return;
    }

    const coll = collection(db, 'users', userId, contentType);
    const snapshot = await getCountFromServer(coll);
    return snapshot.data().count;
}

export async function sendFriendRequest({senderId, receiverId}) {
    const friendRequestCol = collection(db, 'FriendRequests');

    const newRequest = {
        senderId,
        receiverId,
        status: 'pending',
        timestamp: Timestamp.now()
    }

    try {
        const docRef = await addDoc(friendRequestCol, newRequest);
        return docRef.id;
    } catch (error) {
        console.log('Ошибка при отправке заявки в друзья: ', error);
        return null;
    }
}

export async function getFriendRequests(userId) {
    const friendRequestCol = collection(db, 'FriendRequests');
    const q = query(friendRequestCol, where('receiverId', '==', userId), where('status', '==', 'pending'));

    try {
        const querySnapshot = await getDocs(q)
        const userInfoPromises = querySnapshot.docs.map(async (doc) => {
            const request = doc.data();
            const userInfo = await getUserInfo(request.senderId);
            return {
                ...userInfo,
                requestId: doc.id
            };
        });
        return await Promise.all(userInfoPromises);

    } catch (error) {
        console.log('Ошибка при получении заявок в друзья: ', error);
        return [];
    }
}

export async function acceptFriendRequest({userId, friendId, friendInfo}) {
    // const userCol = collection(db, 'users', userId, 'friends');
    // const friendCol = collection(db, 'users', friendId, 'friends');
    const requestQuery = query(collection(db, 'FriendRequests'), where('senderId', '==', friendId));

    try {
        const userInfo = await getUserInfo(userId);

        await setDoc(doc(db, 'users', userId, 'friends', friendId), friendInfo);
        await setDoc(doc(db, 'users', friendId, 'friends', userId), userInfo)

        const requestSnapshot = await getDocs(requestQuery);
        const requestId = requestSnapshot.docs[0].id;
        await deleteDoc(doc(db, 'FriendRequests', requestId));
    } catch (error) {
        console.log('Ошибка при одобрении заявки', error)
    } finally {
        return userId;
    }
}

export async function rejectFriendRequest(requestId) {
    console.log(requestId);
    try {
        await deleteDoc(doc(db, 'FriendRequests', requestId));
    } catch (error) {
        console.log('Ошибка при отклонении запроса в друзья', error);
    } finally {
        return requestId;
    }
}

export async function removeFromFriends({userId, friendId}) {
    try {
        await deleteContent({userId, contentType: 'friends', id: friendId});
        await deleteContent({userId: friendId, contentType: 'friends', id: userId})
    } catch (error) {
        console.log('Ошибка при удалении друзей', error);
    } finally {
        return userId;
    }
}


// apiSlice.endpoints.getPosts.initiate = getPosts;

// export default getPosts;


