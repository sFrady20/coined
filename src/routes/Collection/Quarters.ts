import { AssetContextType } from "../../components/AssetLoader";
import { ReactComponent as CultureBanner } from "../../media/cultureBanner.svg";
import { ReactComponent as CultureCard } from "../../media/cultureCard.svg";
import { ReactComponent as HistoryBanner } from "../../media/historyBanner.svg";
import { ReactComponent as HistoryCard } from "../../media/historyCard.svg";
import { ReactComponent as WildlifeBanner } from "../../media/wildlifeBanner.svg";
import { ReactComponent as WildlifeCard } from "../../media/wildlifeCard.svg";
import { ReactComponent as ScienceBanner } from "../../media/scienceBanner.svg";
import { ReactComponent as ScienceCard } from "../../media/scienceCard.svg";
import { ReactComponent as StatesBanner } from "../../media/statesBanner.svg";
import { ReactComponent as StatesCard } from "../../media/statesCard.svg";
import { FunctionComponent } from "react";

export type Quarter = {
  imgFront: keyof AssetContextType["images"];
  imgBack: keyof AssetContextType["images"];
  questionDataId: string;
  banner: FunctionComponent<
    React.SVGProps<SVGSVGElement> & { title?: string | undefined }
  >;
  card: FunctionComponent<
    React.SVGProps<SVGSVGElement> & { title?: string | undefined }
  >;
  title: string;
  description: string;
};

const Quarters = {
  science: {
    imgFront: "scienceQuarter",
    imgBack: "scienceQuarter",
    title: "Science Quarter",
    questionDataId: "Science & Nature",
    banner: ScienceBanner,
    card: ScienceCard,
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur congue tellus vitae erat dictum, sed bibendum nunc accumsan.",
  } as Quarter,

  culture: {
    imgFront: "cultureQuarter",
    imgBack: "cultureQuarter",
    title: "Culture Quarter",
    questionDataId: "Culture",
    banner: CultureBanner,
    card: CultureCard,
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur congue tellus vitae erat dictum, sed bibendum nunc accumsan.",
  } as Quarter,

  history: {
    imgFront: "historyQuarter",
    imgBack: "historyQuarter",
    title: "History Quarter",
    questionDataId: "History.",
    banner: HistoryBanner,
    card: HistoryCard,
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur congue tellus vitae erat dictum, sed bibendum nunc accumsan.",
  } as Quarter,

  states: {
    imgFront: "statesQuarter",
    imgBack: "statesQuarter",
    title: "National Park of American Samoa Quarter",
    questionDataId: "State History",
    banner: StatesBanner,
    card: StatesCard,
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur congue tellus vitae erat dictum, sed bibendum nunc accumsan.",
  } as Quarter,

  wildlife: {
    imgFront: "wildlifeQuarter",
    imgBack: "wildlifeQuarter",
    title: "Wildlife Quarter",
    questionDataId: "Wildlife",
    banner: WildlifeBanner,
    card: WildlifeCard,
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur congue tellus vitae erat dictum, sed bibendum nunc accumsan.",
  } as Quarter,
};

export default Quarters;
