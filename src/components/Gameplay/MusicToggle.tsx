import React, { memo } from "react";
import styles from "./MusicToggle.module.scss";
import { ReactComponent as MusicIcon } from "../../media/music.svg";
import { ReactComponent as MuteIcon } from "../../media/mute.svg";

const MusicToggle = memo(
  (props: {
    isMuted?: boolean;
    onMutedChanged?: (isMuted: boolean) => void;
  }) => {
    const { isMuted, onMutedChanged } = props;
    return (
      <div
        className={styles.root}
        onClick={() => onMutedChanged && onMutedChanged(!isMuted)}
      >
        {isMuted ? (
          <MuteIcon className={styles.mute} />
        ) : (
          <MusicIcon className={styles.music} />
        )}
      </div>
    );
  }
);

export default MusicToggle;
