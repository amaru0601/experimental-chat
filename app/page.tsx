import HomeChat from '@/components/home';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

async function getAuthorizationToken() {
  const cookie = cookies().get('token')
    if (cookie) {
        console.log("EXISTE COOKIE")
        // TODO: verify token sign and ttl
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
  const data = await getAuthorizationToken().catch( e => console.error(e)) 
  console.log("LAYOUT")
  console.log(data)

  if (data == null) {
    redirect('/login')
  }

 

  const chats = await fetchChats().catch(e => console.error(e))
  console.log(chats)

  return <HomeChat chats={chats}></HomeChat>
}

export default Home

