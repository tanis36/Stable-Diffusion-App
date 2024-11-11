import {
    ChakraProvider,
    Heading,
    Container,
    Text,
    Input,
    Button,
    Wrap,
    Stack,
    Image,
    Link,
    Box,
    SkeletonCircle,
    SkeletonText,
    Card
}
from "@chakra-ui/react"

import axios from "axios"
import {useState} from "react"

const App = () => {

    const [image, updateImage] = useState()
    const [prompt, updatePrompt] = useState()
    const [loading, updateLoading] = useState()

    const generate = async prompt =>{
        updateLoading(true)
        const result = await axios.get(`http://127.0.0.1:8000/?prompt=${prompt}`)
        updateImage(result.data)
        updateLoading(false)
    }

    return(
        <ChakraProvider>
            <Container centerContent padding={5}>
                <Heading color="teal.500" marginBottom={5}>Stable Diffusion 🎨</Heading>
                <Text fontSize="lg" color="gray.600" textAlign="center" marginBottom={5}>
                    This application was developed using React for the frontend UI and Python for the backend API. 
                    It uses the Stable Diffusion Deep Learning model trained by Stability AI and Runway ML to generate 
                    images based on a given prompt. The model can be found via 
                    github: <Link href={"https://github.com/CompVis/stable-diffusion"}>Stable Diffusion Model</Link></Text>

                <Card padding={6} boxShadow="md" borderRadius="md" marginBottom={5} bg="gray.50">
                    <Wrap align="center">
                        <Input
                            placeholder="Enter your prompt here..."
                            value={prompt}
                            onChange={e => updatePrompt(e.target.value)}
                            width={"300px"}
                        />
                        <Button onClick={e => generate(prompt)} colorScheme="teal" size="md">
                            Generate
                        </Button>
                    </Wrap>
                </Card>

                {loading ? (
                    <Stack spacing={3} align="center" marginY={5}>
                        <SkeletonCircle size="16" />
                        <SkeletonText noOfLines={4} spacing="4" width="300px" />
                    </Stack>
                ) : (
                    image && (
                        <Box boxShadow="lg" borderRadius="md" overflow="hidden" marginTop={5}>
                            <Image src={`data:image/png;base64,${image}`} alt="Generated Art" />
                        </Box>
                    )
                )}
            </Container>
        </ChakraProvider>
    );
};

export default App