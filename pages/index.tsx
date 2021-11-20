import useTranslation from "../hooks/useTranslation";
import AuthContext from "../contexts/auth";

import styles from "../styles/Home.module.scss";
import React, { useContext } from "react";

export default function Home() {
  const { t } = useTranslation();
  const { user, signIn, signOut, isLoading } = useContext(AuthContext);

  return (
    <div className={styles.mainPage}>
      {!isLoading ?
        
          <div className={styles.loginWindow}>
            {!user ?
              <>
                <p className={styles.loginWindowTitle}>{t("logInWith")}</p>
                <button className={styles.discordButton} onClick={signIn}><img src="discord-logo.svg" /><span>Discord</span></button>
              </>
            :
              <>
                {user.avatar ?
                  <img className={styles.avatar} src={`https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}.gif`}/>
                :
                  <img className={styles.avatar} src="default-profile.png" />
                }
                <p className={styles.username}>{user.username}</p>
                <span className={styles.discriminator}>#{user.discriminator}</span>
                <button className={styles.logoutButton} onClick={signOut}>{t("logout")}</button>
              </>
            }
          </div>
      :
        <p>{t("loading")}</p>
      }
    </div>
  );
}
