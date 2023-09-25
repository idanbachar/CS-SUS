import { useState } from "react";
import styles from "./search-user.module.css";
import { BsSearch } from "react-icons/bs";
import { ISearchUser } from "../../interfaces/ISearchUser";
import { GetUser } from "../../services/steamService";

const SearchUser: React.FC<ISearchUser> = (props) => {
  const { placeholder, onSearch } = props;

  const [inputValue, setInputValue] = useState(
    "https://steamcommunity.com/id/Assassin1BK"
  );
  return (
    <div className={styles.container}>
      <div className={styles.inputContainer}>
        <input
          type={"text"}
          className={styles.input}
          placeholder={placeholder}
          onChange={(e) => setInputValue(e.target.value)}
        />
        <BsSearch
          color="black"
          onClick={async () => {
            const userData = await GetUser(inputValue);
            onSearch(userData);
          }}
          style={{ cursor: "pointer" }}
        />
      </div>
    </div>
  );
};

export default SearchUser;
