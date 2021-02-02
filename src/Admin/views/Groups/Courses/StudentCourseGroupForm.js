import React from "react";
import SearchStudentForm from "./SearchStudentForm";
import AddStudentForm from "./AddStudentForm";

const StudentCourseGroupForm = ({ course_group_id, onSuccess, onCancel }) => {
	return (
		<div className="container-absolute flex-row flex-center">
			<div className=" container-lg flex-column bg-white padding-10">
				<SearchStudentForm
					course_group_id={course_group_id}
				/>
				<AddStudentForm
					onSuccess={onSuccess}
					onCancel={onCancel}
					course_group_id={course_group_id}
				/>
			</div>
		</div>
	);
};

export default StudentCourseGroupForm;
