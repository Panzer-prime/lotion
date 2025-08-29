"use client";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import icon from "@/public/image.png";
import ilustration_left from "@/public/ilustration.png";
import ilustration_right from "@/public/ilustration-right.png";
import { ArrowLeft } from "lucide-react";

export default function Home() {
	return (
		<div className="flex flex-col items-center justify-center">
			<div className="flex w-full items-center justify-between p-4 px-5">
				<div className="flex flex-row items-center">
					<Image src={icon} height={64} width={64} alt="icon" />
					<p className="font-medium">Lotion</p>
				</div>
				<div>
					<Button asChild variant="secondary">
						<a href="/sign-in">Log in</a>
					</Button>
				</div>
			</div>
			<div className="flex min-h-screen flex-col items-center justify-center px-6 text-center text-white">
				<h1 className="text-3xl leading-tight font-bold sm:text-5xl">
					Your Ideas
					<span role="img" aria-label="lightbulb">
						💡
					</span>
					, Documents
					<span role="img" aria-label="document">
						📕
					</span>
					, & Plans
					<span role="img" aria-label="rocket">
						🚀
					</span>
					. <br />
					Welcome to <span className="underline">Lotion</span>
				</h1>

				<p className="mt-4 max-w-xl text-lg text-gray-300">
					Zotion is the connected workspace where better, faster work happens.
				</p>

				<Button variant="secondary" className="mt-6" asChild>
					<a href="/documents">
						Get Lotion free
						<span>
							<ArrowLeft className="rotate-180" />
						</span>
					</a>
				</Button>

				<div className="mt-12 flex flex-col justify-center gap-8 sm:flex-row">
					<Image
						src={ilustration_left}
						alt="Illustration Left"
						width={300}
						height={200}
						className="object-contain invert"
					/>
					<Image
						src={ilustration_right}
						alt="Illustration Right"
						width={300}
						height={200}
						className="object-contain invert"
					/>
				</div>
			</div>
		</div>
	);
}
