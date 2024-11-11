import {
    ChakraProvider,
    Heading,
    Container,
    Text,
    Input,
    Button,
    Wrap,
    Image
}
from "@chakra-ui/react"

import axios from "axios"
import {useState} from "react"

const App = () => {

    const [image, updateImage] = useState()
    const [prompt, updatePrompt] = useState()

    const generate = async prompt =>{
        const result = await axios.get(`http://127.0.0.1:8000/?prompt=${prompt}`)
        updateImage(result.data)
    }

    return(
        <ChakraProvider>
            <Container>
                <Heading>Stable Diffusion🎨</Heading>

                <Wrap>
                    <Input value={prompt} onChange={e => updatePrompt(e.target.value)} width={"350px"}></Input>
                    <Button onClick={e => generate(prompt)} colorScheme={"yellow"}>Generate</Button>
                </Wrap>

                {image ? <Image src={`data:image/png;base64,${image}`} /> :null}

            </Container>
        </ChakraProvider>
    );

};

export default App