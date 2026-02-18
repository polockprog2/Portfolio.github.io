import React from "react";
import { motion } from "framer-motion";
import ProjectCard from "./ProjectCard";

const projects = [
	{
		name: "Baksho Grocery Ecommerce",
		description: "A high-performance full-stack grocery ecosystem featuring real-time inventory orchestration and a seamless, conversion-optimized checkout experience.",
		link: "https://github.com/polockprog2/Baksho",
		image: "https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=800&q=80",
		tags: ["Next.js", "Node.js", "Prisma", "Tailwind"]
	},
	{
		name: "Ru Research Hub",
		description: "A state-of-the-art academic ecosystem for paper discovery, real-time researcher collaboration, and knowledge sharing, built with the latest web standards.",
		link: "https://github.com/polockprog2/ru-research-hub",
		image: "https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?auto=format&fit=crop&w=800&q=80",
		tags: ["Next.js 16", "Tailwind v4", "Framer Motion", "Zustand"]
	},
	{
		name: "Quality Automation Framework",
		description: "A comprehensive end-to-end testing suite leveraging Selenium and Cypress for high-assurance web delivery and regression stability.",
		link: "https://github.com/polockprog2/QA-Automation-testing-using-Selenium-tool",
		image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=800&q=80",
		tags: ["Selenium", "Cypress", "Automation", "QA"]
	},
	{
		name: "Enterprise Scheduling System",
		description: "A mission-critical collaborative platform featuring advanced task orchestration and real-time enterprise resource synchronization.",
		link: "https://github.com/polockprog2/Corporate-Calendar",
		image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=800&q=80",
		tags: ["React", "Django", "MySQL", "Scalability"]
	},
];

const RecentProjects = () => (
	<section className="flex flex-col gap-12">
		<div className="flex flex-col gap-4">
			<div className="flex flex-col gap-2">
				<h2 className="text-3xl font-black tracking-tight uppercase">Featured Work</h2>
				<div className="w-20 h-1.5 bg-fuchsia-500 rounded-full" />
			</div>
			<p className="text-slate-400 max-w-2xl leading-relaxed">
				Explore a selection of my architectural milestones in full-stack development, quality automation, and research systems.
			</p>
		</div>

		<div className="grid grid-cols-1 md:grid-cols-2 gap-8">
			{projects.map((project, i) => (
				<motion.div
					key={i}
					initial={{ opacity: 0, y: 20 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true }}
					transition={{ delay: i * 0.1 }}
				>
					<ProjectCard project={project} index={i} />
				</motion.div>
			))}
		</div>
	</section>
);

export default RecentProjects;
