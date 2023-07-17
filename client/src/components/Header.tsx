import { Box, Heading } from "@chakra-ui/react";

export default function Header() {
	return (
		<Box bg='purple.600' color='white'>
			<Heading minW={{ base: '300px', md: '400px' }} py={5} px={20} size='xl'>Github Profile Getter</Heading>
		</Box>
	)
}
