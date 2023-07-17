import { Box, Card, CardBody, HStack, Heading, Text } from "@chakra-ui/react";
import { RepoData } from "../../../types";

export default function RepoCard({ data }: { data: RepoData }) {
	return (
		<Card>
			<CardBody display="flex" flexDirection="column">
				<HStack>
					<Heading
						as="a"
						rel="noopener noreferrer"
						target="_blank"
						_hover={{
							color: "purple.600",
							transitionDuration: "0.5s",
						}}
						transition={"0.5s"}
						href={data.url}
						size="sm"
					>
						{data.name}
					</Heading>
					<Box ms="auto" border="1px solid" borderRadius={20} px={3}>
						<Text fontSize="sm">Public</Text>
					</Box>
				</HStack>
				<Text mt={2} fontSize="sm" color="#555">
					{data.description}
				</Text>

				<HStack mt="auto">
					<Box
						bg={data.color}
						width="10px"
						height="10px"
						borderRadius={100}
						mt="auto"
						mb={1.5}
					/>
					<Text mt={4} fontSize="sm" color="#555">
						{data.language}
					</Text>
				</HStack>
			</CardBody>
		</Card>
	);
}
