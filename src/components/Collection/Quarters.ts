import { AssetContextType } from "../../components/AssetLoader";

import { ReactComponent as CultureBanner } from "../../media/cultureBanner.svg";
import { ReactComponent as CultureCard } from "../../media/cultureCard.svg";
import { ReactComponent as CulturePanel } from "../../media/culturePanel.svg";
import { ReactComponent as CultureDetailBg } from "../../media/cultureDetailBg.svg";

import { ReactComponent as HistoryBanner } from "../../media/historyBanner.svg";
import { ReactComponent as HistoryCard } from "../../media/historyCard.svg";
import { ReactComponent as HistoryPanel } from "../../media/historyPanel.svg";
import { ReactComponent as HistoryDetailBg } from "../../media/historyDetailBg.svg";

import { ReactComponent as WildlifeBanner } from "../../media/wildlifeBanner.svg";
import { ReactComponent as WildlifeCard } from "../../media/wildlifeCard.svg";
import { ReactComponent as WildlifePanel } from "../../media/wildlifePanel.svg";
import { ReactComponent as WildlifeDetailBg } from "../../media/wildlifeDetailBg.svg";

import { ReactComponent as ScienceBanner } from "../../media/scienceBanner.svg";
import { ReactComponent as ScienceCard } from "../../media/scienceCard.svg";
import { ReactComponent as SciencePanel } from "../../media/sciencePanel.svg";
import { ReactComponent as ScienceDetailBg } from "../../media/scienceDetailBg.svg";

import { ReactComponent as StatesBanner } from "../../media/statesBanner.svg";
import { ReactComponent as StatesCard } from "../../media/statesCard.svg";
import { ReactComponent as StatesPanel } from "../../media/statesPanel.svg";
import { ReactComponent as StatesDetailBg } from "../../media/statesDetailBg.svg";

import { FunctionComponent } from "react";

type SVG = FunctionComponent<
  React.SVGProps<SVGSVGElement> & { title?: string | undefined }
>;

export type Quarter = {
  imgFront: keyof AssetContextType["images"];
  imgBack: keyof AssetContextType["images"];
  questionDataId: string;
  title: string;
  description: string;
  banner: SVG;
  card: SVG;
  panel: SVG;
  detailBg: SVG;
};

const Quarters = {
  science: {
    imgFront: "quarterFront",
    imgBack: "scienceQuarter",
    questionDataId: "SCIENCE & NATURE",
    title: "Science Quarter",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur congue tellus vitae erat dictum, sed bibendum nunc accumsan.",
    banner: ScienceBanner,
    card: ScienceCard,
    panel: SciencePanel,
    detailBg: ScienceDetailBg,
  } as Quarter,

  culture: {
    imgFront: "quarterFront",
    imgBack: "cultureQuarter",
    questionDataId: "CULTURE",
    title: "Culture Quarter",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur congue tellus vitae erat dictum, sed bibendum nunc accumsan.",
    banner: CultureBanner,
    card: CultureCard,
    panel: CulturePanel,
    detailBg: CultureDetailBg,
  } as Quarter,

  history: {
    imgFront: "quarterFront",
    imgBack: "historyQuarter",
    questionDataId: "HISTORY",
    title: "History Quarter",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur congue tellus vitae erat dictum, sed bibendum nunc accumsan.",
    banner: HistoryBanner,
    card: HistoryCard,
    panel: HistoryPanel,
    detailBg: HistoryDetailBg,
  } as Quarter,

  states: {
    imgFront: "quarterFront",
    imgBack: "statesQuarter",
    questionDataId: "STATES & TERRITORIES",
    title: "National Park of American Samoa Quarter",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur congue tellus vitae erat dictum, sed bibendum nunc accumsan.",
    banner: StatesBanner,
    card: StatesCard,
    panel: StatesPanel,
    detailBg: StatesDetailBg,
  } as Quarter,

  wildlife: {
    imgFront: "quarterFront",
    imgBack: "wildlifeQuarter",
    questionDataId: "WILDLIFE",
    title: "Wildlife Quarter",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur congue tellus vitae erat dictum, sed bibendum nunc accumsan.",
    banner: WildlifeBanner,
    card: WildlifeCard,
    panel: WildlifePanel,
    detailBg: WildlifeDetailBg,
  } as Quarter,
};

export default Quarters;
