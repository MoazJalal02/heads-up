import { getServerSession } from "next-auth"
import { authOptions } from "../api/auth/[...nextauth]/route"
import styles from './login.module.css'
import Link from "next/link"
import { mergeAnonymousIntoUserCart } from "../cart/actions"

export default async function page() {
    const session = await getServerSession(authOptions)
    console.log("User:",session?.user)
    if(session?.user){
        mergeAnonymousIntoUserCart(session.user.id)
    }
    return (
        <main className={styles.container}> 
            {session ?
                <>
                    <p>{session.user?.name}</p>
                    <p>{session.user?.email}</p>
                    {/* @ts-ignore */}
                    <p>{session.user?.role}</p>
                    <Link className={styles.link} href="/api/auth/signout?callbackUrl=/">Logout</Link>
                </> 
                :<Link className={styles.link} href="/api/auth/signin?callbackUrl=/">Login</Link>
            }
        </main>
    )
}
