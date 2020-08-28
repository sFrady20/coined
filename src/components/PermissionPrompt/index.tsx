import React, { memo } from "react";
import styles from "./index.module.scss";
import { motion } from "framer-motion";

const PermissionPrompt = () => {
  return (
    <motion.div
      className={styles.root}
      variants={{
        requestingPermissions: { translateY: 0, transition: { duration: 0 } },
        permissionsGranted: { opacity: 0, transition: { duration: 0 } },
        permissionsDenied: { translateX: 100, transition: { duration: 0 } },
      }}
      initial="permissionsGranted"
      animate="requestingPermissions"
      exit="permissionsGranted"
    >
      Please Accept
    </motion.div>
  );
};

export default memo(PermissionPrompt);
