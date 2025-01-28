import React, { useEffect, useState } from "react";
import { Send, User, Bot, Github, Linkedin, Mail } from "lucide-react";
import { getAbout } from "../../services/apiaboutme";
import { getProjects } from "../../services/apiProject";
import { getResume } from "../../services/apiresume";
import { getSkills } from "../../services/apiskill";

interface Message {
  id: string;
  type: "user" | "assistant";
  content: string;
  timestamp: Date;
}

interface ProjectData {
  id: number;
  title: string;
  description: string;
  technologies: string | string[]; // Instead of just string[]
  link?: string;
}

interface SkillData {
  id: number;
  category: string;
  name: string | string[]; // Instead of just string[]
}

interface ResumeData {
  id: number;
  certifications: string;
  summary: string;
  email: string;
  full_name: string;
  phone: string;
  education: string;
}

interface AboutData {
  id: number;
  contact_email: string;
  Full_name: string;
  github_url: string;
  linkedin_url: string;
  location: string;
  long_bio: string;
  personal_interests: string;
  short_bio: string;
  title: string;
  twitter_url: string;
}

const ChatPortfolio = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "initial",
      type: "assistant",
      content:
        "Hi! I'm Ewherhe Akpesiri. I'm a Frontend developer specializing in Next.js, TypeScript, and React. Type 'help' to see what I can show you!",
      timestamp: new Date(),
    },
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const addMessage = (type: "user" | "assistant", content: string) => {
    setMessages((prev) => [
      ...prev,
      {
        id: crypto.randomUUID(),
        type,
        content,
        timestamp: new Date(),
      },
    ]);
  };

  const formatAboutResponse = (about: AboutData[]): string => {
    if (!about?.length) return "About not found.";

    return about
      .map((profile) => {
        const sections = [
          // Header Section
          `# ${profile.Full_name}`,
          `${profile.title}`,

          // Professional Summary
          `## Professional Summary`,
          `${profile.short_bio}`,

          // Detailed Biography
          `## About Me`,
          `${profile.long_bio}`,

          // Contact & Location
          `## Contact Information`,
          `📍 ${profile.location}`,
          `📧 ${profile.contact_email}`,

          // Social Links
          `## Social Links`,
          `🔗 LinkedIn: ${profile.linkedin_url}`,
          `🐱 GitHub: ${profile.github_url}`,
          `🐦 Twitter: ${profile.twitter_url}`,

          // Personal Interests
          `## Personal Interests`,
          `${profile.personal_interests}`,
        ];

        // Filter out sections with null values
        return sections
          .filter((section) => section.indexOf("null") === -1)
          .join("\n\n");
      })
      .join("\n\n---\n\n"); // Add separator between multiple profiles if needed
  };

  const formatProjectsResponse = (projects: ProjectData[]) => {
    if (!projects?.length) return "No projects found.";
    // console.log(projects);
    return projects
      .map((project) => {
        const technologiesList = Array.isArray(project.technologies)
          ? project.technologies.join(", ")
          : project.technologies;

        const projectInfo = [
          `📁 ${project.title}`,
          project.description,
          `🛠️ Technologies: ${technologiesList}`,
        ];

        if (project.link) {
          projectInfo.push(`🔗 Link: ${project.link}`);
        }

        return projectInfo.join("\n");
      })
      .join("\n\n");
  };

  const formatSkillsResponse = (skills: SkillData[]) => {
    if (!skills?.length) return "No skills found.";
    return skills
      .map((category) => {
        const skillsList = Array.isArray(category.name)
          ? category.name.join(", ")
          : category.name;

        return `🔹 ${category.category}\n${skillsList
          .split(", ")
          .map((skill) => `  • ${skill.trim()}`)
          .join("\n")}`;
      })
      .join("\n\n");
  };

  const handleUserQuery = async (query: string): Promise<string> => {
    const normalizedQuery = query.toLowerCase().trim();

    try {
      switch (true) {
        case normalizedQuery === "help": {
          return `I can help you learn more about me! Try these commands:

📌 about me - Learn about my background and experience
💼 projects - View my portfolio projects
🎯 skills - See my technical skills
📋 experience - View my work experience
📧 contact - Get my contact information`;
        }

        case normalizedQuery.includes("about"): {
          const aboutData = await getAbout();
          return formatAboutResponse(aboutData as AboutData[]);
        }

        case normalizedQuery.includes("project"): {
          const projects = await getProjects();
          return formatProjectsResponse(projects as ProjectData[]);
        }

        case normalizedQuery.includes("skill"): {
          const skills = await getSkills();
          return formatSkillsResponse(skills as SkillData[]);
        }

        case normalizedQuery.includes("experience") ||
          normalizedQuery.includes("resume"): {
          const resume = await getResume();

          // Check if resume exists
          if (!resume?.length) {
            return "No experience information available.";
          }

          // Map through resume entries and format them
          return resume
            .map((entry: ResumeData) => {
              return [
                // Personal Information
                `${entry.full_name}`,
                `${entry.phone}`,

                // Professional Information
                `🏢 ${entry.certifications}`,
                `📅 ${entry.education}`,

                // Summary - Split and format each line
                entry.summary
                  .split("\n")
                  .map((line) => `${line}`)
                  .join("\n"),
              ].join("\n");
            })
            .join("\n\n");
        }

        case normalizedQuery.includes("contact"): {
          return `📫 You can reach me through:

    
          🐱 GitHub: github.com/Akpcodes636
          💼 LinkedIn: linkedin.com/in/ewherhe-akpesiri-73358819a
          📧 Email: ewherheakpesiri@gmail.com
          🐦 Twitter: x.com/bigRonNY65
          📱 Phone: 08169699200`;
        }

        default:
          return "I'm not sure what you're looking for. Type 'help' to see available commands!";
      }
    } catch (error) {
      console.error("Error handling query:", error);
      return "I encountered an error fetching that information. Please try again in a moment.";
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const userMessage = inputValue.trim();
    if (!userMessage) return;

    setInputValue("");
    addMessage("user", userMessage);
    setIsLoading(true);

    try {
      const response = await handleUserQuery(userMessage);
      addMessage("assistant", response);
    } catch (error) {
      addMessage(
        "assistant",
        "Sorry, I encountered an error. Please try again."
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="hidden md:flex w-64 bg-gray-900 text-white flex-col">
        <div className="p-4 border-b border-gray-700">
          <h1 className="text-xl font-bold">My Portfolio</h1>
        </div>
        <nav className="flex-1 overflow-y-auto p-4 space-y-2">
          {["About", "Projects", "Skills", "Experience", "Contact"].map(
            (item) => (
              <button
                key={item}
                onClick={() => {
                  setInputValue(item.toLowerCase());
                  handleSubmit(new Event("submit") as any);
                }}
                className="w-full text-left px-3 py-2 rounded hover:bg-gray-800 transition-colors"
              >
                {item}
              </button>
            )
          )}
        </nav>
        <div className="p-4 border-t border-gray-700">
          <div className="flex space-x-4 justify-center">
            <a
              href="https://github.com/ewhe"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Github className="w-5 h-5 cursor-pointer hover:text-blue-400 transition-colors" />
            </a>
            <a
              href="https://linkedin.com/in/ewhe"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Linkedin className="w-5 h-5 cursor-pointer hover:text-blue-400 transition-colors" />
            </a>
            <a href="mailto:ewhe@example.com">
              <Mail className="w-5 h-5 cursor-pointer hover:text-blue-400 transition-colors" />
            </a>
          </div>
        </div>
      </div>

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col">
        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${
                message.type === "user" ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={`flex max-w-3xl ${
                  message.type === "user" ? "flex-row-reverse" : "flex-row"
                }`}
              >
                <div
                  className={`flex-shrink-0 h-8 w-8 rounded-full flex items-center justify-center ${
                    message.type === "user" ? "bg-blue-500" : "bg-gray-700"
                  }`}
                >
                  {message.type === "user" ? (
                    <User size={16} className="text-white" />
                  ) : (
                    <Bot size={16} className="text-white" />
                  )}
                </div>
                <div
                  className={`mx-2 px-4 py-2 rounded-lg ${
                    message.type === "user"
                      ? "bg-blue-500 text-white"
                      : "bg-gray-100"
                  } whitespace-pre-wrap`}
                >
                  {message.content}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Input Area */}
        <div className="border-t p-4">
          <form onSubmit={handleSubmit} className="flex space-x-4">
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Type a message..."
              className="flex-1 px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-blue-500"
              disabled={isLoading}
            />
            <button
              type="submit"
              className="bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-600 disabled:bg-blue-300 transition-colors"
              disabled={isLoading}
            >
              <Send size={20} />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ChatPortfolio;
