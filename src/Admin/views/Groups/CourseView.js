import React from 'react';
import {useParams} from 'react-router-dom';

const CourseView = ()=>{
	const {course_id} = useParams();
	return (
		<div>
				Course
		</div>
	);
};

export default CourseView;