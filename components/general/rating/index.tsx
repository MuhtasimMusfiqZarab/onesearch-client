import styles from "./styles.module.scss";

const Rating = ({ rating, id, isEditable, onChange = undefined }) => {
	const handleChange = (event) => {
		event.target.checked = event.target.name;
		onChange?.(event.target.value);
	};

	return (
		<div className={`${styles.rating__wrap} ${isEditable === false ? styles.rating__wrap_disabled : ''}`}>
			<svg
				aria-hidden="true"
				style={{
					position: "absolute",
					width: "0",
					height: "0",
					overflow: "hidden",
				}}
				version="1.1"
				xmlns="http://www.w3.org/2000/svg"
				xmlnsXlink="http://www.w3.org/1999/xlink"
			>
				<defs>
					<symbol id="icon-star" viewBox="0 0 26 28">
						<path d="M26 10.109c0 0.281-0.203 0.547-0.406 0.75l-5.672 5.531 1.344 7.812c0.016 0.109 0.016 0.203 0.016 0.313 0 0.406-0.187 0.781-0.641 0.781-0.219 0-0.438-0.078-0.625-0.187l-7.016-3.687-7.016 3.687c-0.203 0.109-0.406 0.187-0.625 0.187-0.453 0-0.656-0.375-0.656-0.781 0-0.109 0.016-0.203 0.031-0.313l1.344-7.812-5.688-5.531c-0.187-0.203-0.391-0.469-0.391-0.75 0-0.469 0.484-0.656 0.875-0.719l7.844-1.141 3.516-7.109c0.141-0.297 0.406-0.641 0.766-0.641s0.625 0.344 0.766 0.641l3.516 7.109 7.844 1.141c0.375 0.063 0.875 0.25 0.875 0.719z"></path>
					</symbol>
					<symbol id="icon-star-half" viewBox="0 0 13 28">
						<path d="M13 0.5v20.922l-7.016 3.687c-0.203 0.109-0.406 0.187-0.625 0.187-0.453 0-0.656-0.375-0.656-0.781 0-0.109 0.016-0.203 0.031-0.313l1.344-7.812-5.688-5.531c-0.187-0.203-0.391-0.469-0.391-0.75 0-0.469 0.484-0.656 0.875-0.719l7.844-1.141 3.516-7.109c0.141-0.297 0.406-0.641 0.766-0.641v0z"></path>
					</symbol>
				</defs>
			</svg>
			{/* ./svg-sprites */}

			<div className={styles.rating_stars}>
				<input
					className={styles.rating_stars_input}
					type="radio"
					name={`rating${id}`}
					value="5"
					onChange={handleChange}
					disabled={isEditable === false ? true : false}
					id={`rating-5${id}`}
					defaultChecked={rating === "5" ? true : false}
				/>
				<label className={styles.rating_stars_view} htmlFor={`rating-5${id}`}>
					<svg className={`${styles.icon} ${styles.icon_star}`}>
						<use xlinkHref="#icon-star"></use>
					</svg>
				</label>
				<input
					className={styles.rating_stars_input}
					type="radio"
					name={`rating${id}`}
					value="4.5"
					onChange={handleChange}
					disabled={isEditable === false ? true : false}
					id={`rating-4.5${id}`}
					defaultChecked={rating === "4.5" ? true : false}
				/>
				<label
					className={`${styles.rating_stars_view} ${styles.is_half}`}
					htmlFor={`rating-4.5${id}`}
				>
					<svg className={`${styles.icon} ${styles.icon_star_half}`}>
						<use xlinkHref="#icon-star-half"></use>
					</svg>
				</label>
				<input
					className={styles.rating_stars_input}
					type="radio"
					name={`rating${id}`}
					value="4"
					onChange={handleChange}
					disabled={isEditable === false ? true : false}
					id={`rating-4${id}`}
					defaultChecked={rating === "4" ? true : false}
				/>
				<label className={styles.rating_stars_view} htmlFor={`rating-4${id}`}>
					<svg className={`${styles.icon} ${styles.icon_star}`}>
						<use xlinkHref="#icon-star"></use>
					</svg>
				</label>
				<input
					className={styles.rating_stars_input}
					type="radio"
					name={`rating${id}`}
					value="3.5"
					onChange={handleChange}
					disabled={isEditable === false ? true : false}
					id={`rating-3.5${id}`}
					defaultChecked={rating === "3.5" ? true : false}
				/>
				<label
					className={`${styles.rating_stars_view} ${styles.is_half}`}
					htmlFor={`rating-3.5${id}`}
				>
					<svg className={`${styles.icon} ${styles.icon_star_half}`}>
						<use xlinkHref="#icon-star-half"></use>
					</svg>
				</label>
				<input
					className={styles.rating_stars_input}
					type="radio"
					name={`rating${id}`}
					value="3"
					onChange={handleChange}
					disabled={isEditable === false ? true : false}
					id={`rating-3${id}`}
					defaultChecked={rating === "3" ? true : false}
				/>
				<label className={styles.rating_stars_view} htmlFor={`rating-3${id}`}>
					<svg className={`${styles.icon} ${styles.icon_star}`}>
						<use xlinkHref="#icon-star"></use>
					</svg>
				</label>
				<input
					className={styles.rating_stars_input}
					type="radio"
					name={`rating${id}`}
					value="2.5"
					onChange={handleChange}
					disabled={isEditable === false ? true : false}
					id={`rating-2.5${id}`}
					defaultChecked={rating === "2.5" ? true : false}
				/>
				<label
					className={`${styles.rating_stars_view} ${styles.is_half}`}
					htmlFor={`rating-2.5${id}`}
				>
					<svg className={`${styles.icon} ${styles.icon_star_half}`}>
						<use xlinkHref="#icon-star-half"></use>
					</svg>
				</label>
				<input
					className={styles.rating_stars_input}
					type="radio"
					name={`rating${id}`}
					value="2"
					onChange={handleChange}
					disabled={isEditable === false ? true : false}
					id={`rating-2${id}`}
					defaultChecked={rating === "2" ? true : false}
				/>
				<label className={styles.rating_stars_view} htmlFor={`rating-2${id}`}>
					<svg className={`${styles.icon} ${styles.icon_star}`}>
						<use xlinkHref="#icon-star"></use>
					</svg>
				</label>
				<input
					className={styles.rating_stars_input}
					type="radio"
					name={`rating${id}`}
					value="1.5"
					onChange={handleChange}
					disabled={isEditable === false ? true : false}
					id={`rating-1.5${id}`}
					defaultChecked={rating === "1.5" ? true : false}
				/>
				<label
					className={`${styles.rating_stars_view} ${styles.is_half}`}
					htmlFor={`rating-1.5${id}`}
				>
					<svg className={`${styles.icon} ${styles.icon_star_half}`}>
						<use xlinkHref="#icon-star-half"></use>
					</svg>
				</label>
				<input
					className={styles.rating_stars_input}
					type="radio"
					name={`rating${id}`}
					value="1"
					onChange={handleChange}
					disabled={isEditable === false ? true : false}
					id={`rating-1${id}`}
					defaultChecked={rating === "1" ? true : false}
				/>
				<label className={styles.rating_stars_view} htmlFor={`rating-1${id}`}>
					<svg className={`${styles.icon} ${styles.icon_star}`}>
						<use xlinkHref="#icon-star"></use>
					</svg>
				</label>
				<input
					className={styles.rating_stars_input}
					type="radio"
					name={`rating${id}`}
					value="0.5"
					onChange={handleChange}
					disabled={isEditable === false ? true : false}
					id={`rating-0.5${id}`}
				/>
				<label
					className={`${styles.rating_stars_view} ${styles.is_half}`}
					htmlFor={`rating-0.5${id}`}
				>
					<svg className={`${styles.icon} ${styles.icon_star_half}`}>
						<use xlinkHref="#icon-star-half"></use>
					</svg>
				</label>
			</div>
		</div>
	);
};

export default Rating;
