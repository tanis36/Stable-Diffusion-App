// Chakra UI dependencies
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

// Allows API calls
import axios from "axios"
// State management
import {useState} from "react"

// Main app
const App = () => {

    // Define state variables
    const [image, updateImage] = useState() // Store generated image
    const [prompt, updatePrompt] = useState() // Store user's prompt
    const [loading, updateLoading] = useState() // Display loading state while image is generating

    // Function to call the backend API and generate an image based on the prompt provided
    const generate = async prompt =>{
        // Set loading to true when generating starts
        updateLoading(true)
        // Make the API request
        const result = await axios.get(`http://127.0.0.1:8000/?prompt=${prompt}`)
        // Store the result in the image state
        updateImage(result.data)
        // Set loading to false after image generation completes
        updateLoading(false)
    }

    // Use Chakra UI for a nice looking UI and return the image to the UI
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