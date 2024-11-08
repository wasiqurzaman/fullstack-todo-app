import styles from "./Sidebar.module.css";

import { FaBars } from "react-icons/fa6";
import { FaSliders } from "react-icons/fa6";
import { FaSignOutAlt } from "react-icons/fa";
import { FaAnglesRight } from "react-icons/fa6";
import { FaListCheck } from "react-icons/fa6";
import { FaNoteSticky } from "react-icons/fa6";
import { FaCalendarDays } from "react-icons/fa6";
import { FaMagnifyingGlass } from "react-icons/fa6";
import { useState } from "react";

import { motion } from "framer-motion";

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(true);
  const [selected, setSelected] = useState(null);

  const style = {
    width: isOpen ? "fit-content" : "50px",
    height: isOpen ? "100%" : "fit-content",
    // padding: isOpen ? "1.5rem" : "1rem",
  };

  return (
    <motion.nav
      layout
      // animate={{
      //   transition: {
      //     delay: 0.3,
      //   },
      // }}
      className={styles.sidebar}
      style={style}
    >
      <motion.div layout className={styles.navHeadingBox}>
        {isOpen && <h2 className={styles.navHeading}>Menu</h2>}
        <div>
          <motion.div layout>
            <FaBars
              size="2.4rem"
              className={styles.menuBars}
              onClick={() => setIsOpen(isOpen => !isOpen)}
            />
          </motion.div>
        </div>
      </motion.div>

      {isOpen && <SidebarSearch />}

      {isOpen && (
        <div className={styles.sidebarItems}>
          <h3>Tasks</h3>

          <SidebarItems
            icon={<FaAnglesRight />}
            title="Today"
            selected={selected}
            setSelected={setSelected}
            isOpen={isOpen}
          />

          <SidebarItems
            icon={<FaListCheck />}
            title="Tomorrow"
            selected={selected}
            setSelected={setSelected}
            isOpen={isOpen}
          />

          <SidebarItems
            icon={<FaCalendarDays />}
            title="Calender"
            selected={selected}
            setSelected={setSelected}
            isOpen={isOpen}
          />
          <SidebarItems
            icon={<FaNoteSticky />}
            title="Sticky Wall"
            selected={selected}
            setSelected={setSelected}
            isOpen={isOpen}
          />
        </div>
      )}

      {isOpen && (
        <div className={styles.sidebarItems}>
          <h3>Lists</h3>

          <SidebarItems
            color={"red"}
            title="Personal"
            selected={selected}
            setSelected={setSelected}
            isOpen={isOpen}
          />
          <SidebarItems
            color={"red"}
            title="Work"
            selected={selected}
            setSelected={setSelected}
            isOpen={isOpen}
          />
          <SidebarItems
            color={"red"}
            title="Study"
            selected={selected}
            setSelected={setSelected}
            isOpen={isOpen}
          />
        </div>
      )}

      {isOpen && (
        <div className={styles.sidebarItems}>
          <h3>Tags</h3>
        </div>
      )}

      {isOpen && (
        <div className={`${styles.sidebarItems} ${styles.last}`}>
          <SidebarItems
            icon={<FaSliders />}
            title="Settings"
            selected={selected}
            setSelected={setSelected}
            isOpen={isOpen}
          />
          <SidebarItems
            icon={<FaSignOutAlt />}
            title="Sign out"
            selected={selected}
            setSelected={setSelected}
            isOpen={isOpen}
          />
        </div>
      )}
    </motion.nav>
  );
}

function SidebarItems({ icon, title, color, selected, setSelected, isOpen }) {
  const style = {
    // width: isOpen ? "fit-content" : "60x",
    backgroundColor: selected === title ? "#bcbcbc" : "",
  };
  return (
    <div
      className={styles.sidebarNavs}
      style={style}
      onClick={() => setSelected(title)}
    >
      {icon || (
        <div
          className={styles.listBox}
          style={{ backgroundColor: color }}
        ></div>
      )}
      {isOpen && <span>{title}</span>}
    </div>
  );
}

function SidebarSearch() {
  return (
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
  );
}
