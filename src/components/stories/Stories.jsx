import { useState } from 'react';
import { useGetContentQuery, useCreateContentMutation } from '../../services/api/apiSlice';
import { motion } from 'framer-motion';

import AddStory from './add-story/AddStory';
import './stories.scss';


const Stories = () => {

    return (
        <div className="stories">
            <button
                className='stories__prev-slide'>
                <i className="fa-solid fa-chevron-right"></i>
            </button>

            <AddStory/>

            <div className="stories__item" data-modal="story-modal">
                <img className="stories__preview" src="/assets/images/stories/stories-2.jpg" alt=""/>
                <div className="stories__title">Заканчиваю сложный проект</div>
                <time className="stories__date" dateTime="2020-09-21 19:21">21.09.2020</time>
            </div>

            <div className="stories__item" data-modal="story-modal">
                <img className="stories__preview"src="/assets/images/stories/stories-3.jpg" alt=""/>
                <div className="stories__title">Переехал в новую квартиру</div>
                <time className="stories__date" dateTime="2020-09-21 19:21">21.09.2020</time>
            </div>

            <div className="stories__item" data-modal="story-modal">
                <img className="stories__preview" src="/assets/images/stories/stories-4.jpg" alt=""/>
                <div className="stories__title">Осень пришла</div>
                <time className="stories__date" dateTime="2020-08-28 19:21">28.08.2020</time>
            </div>

            <button
                className='stories__next-slide'>
                <i className="fa-solid fa-chevron-right"></i>
            </button>

        </div>
    );
}

export default Stories;