export const profile = {
  name: "Johan J Jonex",
  role: "Broadcast & Live Production",
  photo: "/johan.jpg", // put your photo at public/johan.jpg
  resume: "/Johan_Resume.pdf",
  email: "johanjonexwork@gmail.com",
  phone: "+91 8122929197",
  instagram: "johanjnx",
  location: "Chennai, Tamil Nadu, India",
  summary:
    "Media professional with hands-on experience in broadcasting, live streaming and switching, videography, photography, video editing and graphic design. I have worked across broadcast production, event coverage and digital content, with experience in team leadership, production planning, drone operations and technical setup.",
  education: { school: "Loyola College, Chennai", degree: "B.Voc Digital Journalism (pursuing)", year: "Expected graduation 2027" },
  languages: ["Tamil", "English", "Malayalam"],
  stats: [
    { n: 600, suffix: "+", label: "events covered" },
    { n: 3, suffix: " yrs", label: "in broadcast" },
    { n: 7, suffix: "+", label: "short films" },
    { n: 9, suffix: "", label: "media teams" },
  ],
};

export const experience = [
  { org: "Shammah TV", role: "Media Team, Broadcast", time: "3 years", text: "Complete media production: video editing, live streaming and broadcast content for a cable channel. Handled technical setup and creative execution, and led the media team for one year." },
  { org: "Heeds", role: "Assistant Director, Videographer, Drone Operator", time: "4 months", text: "Assisted direction and on-set coordination, shot footage and flew drones for aerial shots." },
  { org: "Galatta Media", role: "Video Editor and Executive Producer", time: "1 month", text: "Edited short-form videos and managed scheduling and publishing timelines." },
  { org: "DT Next / Daily Thanthi", role: "Intern, Video and Graphics", time: "1 month", text: "Turned raw news into carousel posts and short videos for digital platforms." },
  { org: "LAMP, Loyola Art & Media Production", role: "Member, Secretary, Co-ordinator", time: "3 years", text: "Led media coverage for 600+ college events including Ovations, Loyola's main cultural event, across photo, video, editing, design and broadcast." },
  { org: "LOHO Media, Loyola Hostel", role: "Team Member, Media Representative", time: "3 years", text: "Covered hostel events, ran LED wall content, coordinated live execution and produced the LOHO magazine." },
  { org: "LKK Media", role: "Multimedia Artist", time: "3 years", text: "Video editing, graphic design and media support for department events." },
  { org: "Loyola Students Council", role: "Media and Design", time: "3 years", text: "Designed posters for newspapers, magazines and newsletters. Handled media for Shakespeare in Love." },
  { org: "Office of Media Relations, Loyola", role: "Photo and Video", time: "2 years", text: "Documented and published official college events through photos and videos." },
];

export type Work = { title: string; cat: string; note: string; src?: string; href?: string };
export const filters = ["All", "Broadcast", "Video", "Drone", "Photo", "Design"];

// To add your work: drop files in /public/work and set src: "/work/yourfile.mp4" or ".jpg".
// For YouTube/Drive/Instagram links, set href instead.
export const works: Work[] = [
  { title: "Masi Magam Peruvizha, live", cat: "Broadcast", note: "Live streaming and switching team" },
  { title: "Shammah TV broadcast", cat: "Broadcast", note: "Live production for a cable channel" },
  { title: "Ovations, Loyola College", cat: "Broadcast", note: "Coverage of the main cultural event" },
  { title: "Fr. Stan Swamy Meet 2025", cat: "Video", note: "Full event documentation, government event" },
  { title: "The Court, JioHotstar promo", cat: "Video", note: "Promotional video for the series" },
  { title: "Indian Bank corporate ad", cat: "Video", note: "Assistant Director" },
  { title: "Short films (7+)", cat: "Video", note: "Director of Photography and editor" },
  { title: "Dreamers Creation", cat: "Video", note: "Production work" },
  { title: "Aerial reel", cat: "Drone", note: "Drone footage from Heeds and event shoots" },
  { title: "Bigg Boss poster", cat: "Photo", note: "Planning and photoshoot" },
  { title: "Mr. & Mrs. Office poster", cat: "Photo", note: "Planning and photoshoot" },
  { title: "LOHO magazine", cat: "Design", note: "Layout and design, Loyola Hostel" },
  { title: "Newspaper and newsletter posters", cat: "Design", note: "Loyola Students Council" },
];

export const software = [
  { group: "Broadcast", items: ["vMix", "OBS Studio"] },
  { group: "Edit", items: ["Premiere Pro"] },
  { group: "Design", items: ["Photoshop", "InDesign", "Adobe XD", "Affinity", "Canva", "Adobe Express"] },
  { group: "Web", items: ["Dreamweaver"] },
];
