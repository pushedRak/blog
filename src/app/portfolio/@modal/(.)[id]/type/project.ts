export interface TechStack {
  id: number;
  name: string;
  iconUrl: string;
}

export interface ProjectPeriod {
  start: string;
  end: string;
}

export interface TeamSize {
  total: number;
  backend: number;
  frontend: number;
}

export interface MediaContent {
  type: "video" | "image";
  src: string;
}

export interface MyRole {
  description: string;
  image?: MediaContent;
}

export interface MyRoles {
  [key: string]: MyRole;
}

export interface TechnicalChallenge {
  id: number;
  title: string;
  problem: string;
  solution: string;
}

export interface ProjectDetail {
  id: number;
  logoUrl: string;
  title: string;
  subtitle: string;
  period: ProjectPeriod;
  teamSize: TeamSize;
  techStack: TechStack[];
  overview: string;
  mainImage: string;
  myRoles: MyRoles;
  technicalChallenges: TechnicalChallenge[];
  lessonsLearned: string[];
  regrets: string[];
}
