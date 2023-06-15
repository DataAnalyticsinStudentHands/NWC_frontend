import "./Search.css";

const Search = (props) => {
	const { handleSearch, handleSubmitSearch, errorsSearch, registerSearch } = props;
	return (
		<div className="nameSearch">
			<p>You can also search participants by name:</p>
			<form
				key={1}
				onSubmit={handleSubmitSearch(handleSearch)}
				className="mappingNWCSearch_bar">
				<input
					type="text"
					placeholder="SEARCH"
					{...registerSearch("searchText", { required: true })}
				/>

				<button
					type="submit"
					className="mappingNWCSearch_icon"></button>
			</form>
            <div className="errorMessage">
            {errorsSearch.searchText?.type === "required" &&
					"Please enter participants name for search."}
            </div>
		</div>
	);
};

export default Search;
