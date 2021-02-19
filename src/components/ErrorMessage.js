import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faExclamationTriangle } from "@fortawesome/free-solid-svg-icons";

const Errors = ({ msg, errors }) => {
	return (
		<div className="flex-row justify-start">
			<span>
				<strong>{`${msg}:`}</strong>
			</span>
			<div className="flex-column align-start justify-stretch">
				{errors.map((s) => (
					<span className="el-err" key={s}>
						{s}
					</span>
				))}
			</div>
		</div>
	);
};

const ErrorMessage = ({ msg, icon = null }) => {
	return (
		<div className="flex-row align-start justify-start text-white bg-danger error-message">
			<FontAwesomeIcon
				icon={icon ? icon : faExclamationTriangle}
				size="lg"
			/>
			{typeof msg === "string" ? (
				<span>{msg}</span>
			) : (
				<p className="flex-column grow">
					<span className="msg-title">
						{msg.data.message.length > 0
							? msg.data.message
							: "Error"}{" "}
						({msg.status})
					</span>
					{msg.data.errors &&
						Object.keys(msg.data.errors).map((v) => (
							<Errors
								msg={v}
								key={v}
								errors={msg.data.errors[v]}
							/>
						))}
				</p>
			)}
		</div>
	);
};

export default ErrorMessage;
