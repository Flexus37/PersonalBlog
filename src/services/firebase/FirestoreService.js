import { getAuth } from 'firebase/auth';
import { collection, query, getDocs, doc, addDoc, getDoc, deleteDoc, orderBy, getCountFromServer, limit } from 'firebase/firestore';
import { db } from './FirestoreConfig';
import { ref as storageRef, deleteObject } from 'firebase/storage';
import { storage } from './FirestoreConfig';


// const getUser = async (id) => {
//     const userRef = doc(db, 'users', id);
//     const userSnapshot = await getDoc(userRef);
//     return userSnapshot;
// }

// const getUsers = async () => {
//     const usersCol = collection(db, 'users');
//     const usersSnapshot = await getDocs(usersCol);
//     const usersList = usersSnapshot.docs.map(doc => doc.data());
//     return usersList;
// }

export async function getContent({contentType, contentLimit}) {
    let q;

    if (contentLimit) {
        q = query(collection(db, 'users', '1', contentType), orderBy('time', 'desc'), limit(contentLimit));
    } else {
        q = query(collection(db, 'users', '1', contentType), orderBy('time', 'desc'));
    }
    // const q = query(collection(db, 'users', '1', contentType),
    //     orderBy('time', 'desc'), contentLimit ? limit(contentLimit) : null);
    const docSnapshot = await getDocs(q);
    const docList = docSnapshot.docs.map(doc => {
        const data = doc.data();

        // Проверяем, есть ли поле time в данных и оно не пустое
        if (data.time) {

            const milliseconds = data.time.seconds * 1000;
            const dateObject = new Date(milliseconds);
            const time = dateObject.toLocaleString();

            // Возвращаем объект данных с преобразованным временем
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


export async function createContent({contentType, content}) {
    console.log('Content: ' + contentType, content);
    const contentCol = collection(db, 'users', '1', contentType);
    const docRef = await addDoc(contentCol, content);
    return {
        id: docRef.id,
        ...content,
        time: content.time.toDate().toLocaleString()
    };
};

export async function deleteContent({contentType, id}) {
    // Возвращает undefined при успехе
    // Сделать проверку на удаление
    await deleteDoc(doc(db, 'users', '1', contentType, `${id}`));

    return id;
}

export async function deleteContentFiles({contentType, contentIdArr}) {
    if (contentIdArr.length > 0) {
        contentIdArr.forEach(id => {
            const contentRef = storageRef(storage, `users/1/${contentType}/${id}.jpg`);
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

export async function getDocCount(contentType = '') {
    const coll = collection(db, 'users', '1', contentType);
    const snapshot = await getCountFromServer(coll);
    return snapshot.data().count;
}



// apiSlice.endpoints.getPosts.initiate = getPosts;

// export default getPosts;


