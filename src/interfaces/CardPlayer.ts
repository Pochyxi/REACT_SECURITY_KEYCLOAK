import Teams from "./Teams.ts";
import SkillsStatistics from "./SkillsStatistics.ts";

export default interface CardPlayer {
    id: string;
    teams: Teams;
    name: string;
    surname: string;
    accountEmail: string;
    skillsStatistics: SkillsStatistics;
}