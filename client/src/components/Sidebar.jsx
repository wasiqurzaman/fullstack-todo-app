import styles from "./Sidebar.module.css";

import { FaBars } from "react-icons/fa6";
import { FaSliders } from "react-icons/fa6";
import { FaSignOutAlt } from "react-icons/fa";
import { FaAnglesRight } from "react-icons/fa6";
import { FaListCheck } from "react-icons/fa6";
import { FaNoteSticky } from "react-icons/fa6";
import { FaCalendarDays } from "react-icons/fa6";
import { FaMagnifyingGlass } from "react-icons/fa6";

export default function Sidebar() {
  return (
    <div className={styles.sidebar}>
      <div className={styles.navHeadingBox}>
        <h2 className={styles.navHeading}>Menu</h2>
        <FaBars size="2.4rem" className={styles.menuBars} />
      </div>
      <div className={styles.sidebarItems}>
        <div className={styles.searchBox}>
          <FaMagnifyingGlass />
          <input
            type="text"
            placeholder="Search"
            className={styles.searchInput}
          />
        </div>
      </div>
      <div className={styles.sidebarItems}>
        <h3>Tasks</h3>

        <div className={styles.sidebarNavs}>
          <FaAnglesRight />
          <span>Upcoming</span>
        </div>
        <div className={styles.sidebarNavs}>
          <FaListCheck />
          <span>Today</span>
        </div>
        <div className={styles.sidebarNavs}>
          <FaCalendarDays />
          <span>Calendar</span>
        </div>
        <div className={styles.sidebarNavs}>
          <FaNoteSticky />
          <span>Sticky Wall</span>
        </div>
      </div>
      <div className={styles.sidebarItems}>
        <h3>Lists</h3>
        <div className={styles.sidebarNavs}>
          <div className={styles.listBox}></div>
          <span>Personal</span>
        </div>
        <div className={styles.sidebarNavs}>
          <div className={styles.listBox}></div>
          <sxpan>Work</sxpan>
        </div>
        <div className={styles.sidebarNavs}>
          <div className={styles.listBox}></div>

          <span>List1</span>
        </div>
      </div>
      <div className={styles.sidebarItems}>
        <h3>Tags</h3>
      </div>

      <div className={`${styles.sidebarItems} ${styles.last}`}>
        <div className={styles.sidebarNavs}>
          <FaSliders />
          <span>Settings</span>
        </div>
        <div className={styles.sidebarNavs}>
          <FaSignOutAlt />
          <span>Sign out</span>
        </div>
      </div>
    </div>
  );
}
