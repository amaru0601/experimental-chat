import HomeChat from '@/components/home';
import { getServerSession } from 'next-auth';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { authOptions } from './api/auth/[...nextauth]/route';
import AdminChat from '@/components/admin_home';


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
    const session = await getServerSession(authOptions)
    if (session == null) {
        redirect('/login')
    }
    console.log("HOME", session)
    const chats = await fetchChats().catch(e => console.error(e))

    if (session.user?.name == 'wizard_bit') {
        return <AdminChat chats={chats}></AdminChat>
    }

    return <HomeChat chats={chats}></HomeChat>
}

export default Home

