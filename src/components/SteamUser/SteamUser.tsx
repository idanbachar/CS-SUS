import { IUser } from "../../interfaces/IUser";
import Card from "../Card/Card";
import Stats from "../Stats/Stats";
import SteamFriends from "../SteamFriends/SteamFriends";
import StatsItem from "../Stats/StatsItem/StatsItem";
import SteamUserPreview from "./SteamUserPreview/SteamUserPreview";
import styles from "./steam-user.module.css";
import moment from "moment";
import Inventory from "../Inventory/Inventory";
import CounterStrikeGame from "../SteamGames/CounterStrike/CounterStrikeGame";
import Score from "../Score/Score";

const SteamUser: React.FC<IUser> = (props) => {
  const {
    steamid,
    timecreated,
    friends,
    vacBans,
    games,
    inventory,
    steamLevel,
    total_games,
    totalBadges,
    cs2,
    cheater_percentage,
  } = props;

  const years_of_service =
    timecreated !== null && timecreated !== undefined
      ? moment().diff(moment(timecreated), "years")
      : -1;
  return (
    <div className={styles.container} id={steamid}>
      <Card
        cssStyles={{
          justifyContent: "space-around",
          width: "100%",
          maxWidth: "70rem",
          padding: "1rem",
        }}
      >
        <SteamUserPreview {...props} />
        <Stats
          total_games={total_games}
          friends={friends}
          vacBans={vacBans}
          timecreated={years_of_service}
          steamLevel={steamLevel}
          totalBadges={totalBadges}
        />
      </Card>
      {inventory && (
        <>
          <StatsItem
            title={"Inventory"}
            value={inventory.length}
            cssStyles={{ justifySelf: "start", gap: "1rem", display: "flex" }}
          />
          <Card
            cssStyles={{
              width: "100%",
              maxWidth: "70rem",
            }}
          >
            <Inventory items={inventory} />
          </Card>
        </>
      )}
      <>
        <Card
          cssStyles={{
            width: "100%",
            maxWidth: "70rem",
            justifyContent: "space-evenly",
          }}
        >
          <>
            {cs2 && (
              <CounterStrikeGame
                {...cs2}
                cheater_percentage={cheater_percentage}
              />
            )}
            <Score cheater_percentage={cheater_percentage} steamid={steamid} />
          </>
        </Card>
      </>
      {friends && (
        <>
          <StatsItem
            title={"Friends"}
            value={friends.length}
            cssStyles={{ justifySelf: "start", gap: "1rem", display: "flex" }}
          />
          <Card
            cssStyles={{
              width: "100%",
              maxWidth: "70rem",
            }}
          >
            <SteamFriends friends={friends} />
          </Card>
        </>
      )}
    </div>
  );
};

export default SteamUser;
