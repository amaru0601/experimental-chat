import HomeChat from '@/components/home';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

async function getAuthorizationToken() {
    const cookie = cookies().get('token')
    console.log('GET AUTH', cookie)
    if (cookie) {
        const response = await fetch('http://localhost:3000/api', {
            headers: {
                Cookie: cookies().toString(),
            },
        })
        if (response.status != 200) {
            console.log("get auth fail", response.status)
            return null
        }
        console.log("get auth is ok")
        return cookie
    } else {
        return null
    }
}


async function fetchChats() {
    const response = await fetch('http://localhost:8080/api/chats',
        {
            headers: {
                Cookie: cookies().toString()
            }
        }
    )
    const json = await response.json()
    return json
}

const Home = async () => {
    console.log("HOME")
    //const data = await getAuthorizationToken().catch(e => console.error(e))
    //if (data == null) {
    //    redirect('/login')
    //}



    const chats = await fetchChats().catch(e => console.error(e))

    return <HomeChat chats={chats}></HomeChat>
}

export default Home

