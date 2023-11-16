/* eslint-disable @next/next/no-img-element */
import styles from './styles.module.css'
import Link from 'next/link'

import {MdOutlineDashboardCustomize} from 'react-icons/md'
import {AiFillGoogleCircle} from 'react-icons/ai'
import {VscSignOut} from 'react-icons/vsc'

import { useSession, signIn, signOut, getSession } from 'next-auth/react'
import Swal from 'sweetalert2';

export function Header(){
	const {data: session, status} = useSession();

	async function handleSignOut() {
		Swal.fire({
      title: "Tem certeza que deseja sair?",
      icon: "warning",
			iconColor:'#fff',
      showCancelButton: true,
      cancelButtonColor: "#d33",
			cancelButtonText:'Não',
      confirmButtonText: "Sim",
			background:'#191C29',
			color:'#fff'
    }).then(((result) => {
			if(result.isConfirmed){
				signOut()
			}
		}));
		
	}

	async function handleSignIn() {
		await signIn('google')
	}

	return(
		<header className={styles.header}>
			<section className={styles.content}>
				<nav className={styles.nav}>
					<Link href='/'>
						<h1 className={styles.logoTitulo}>Task<span>+</span></h1>
					</Link>
					{
						session?.user && (
							<Link href='/dashboard' className={styles.link}>
								<MdOutlineDashboardCustomize size={40} color='#fff'/>Meu <br/>painel
							</Link>
						)
					}
				
				</nav>
				
				{status === 'loading' ? (<><h1></h1></>) : 
					session ? (
						<div className={styles.ContainerUser}>
							<div>
								<img className={styles.AvatarUser} src={session?.user?.image as string} alt='avatar'/>
								<h3>{session?.user?.name}</h3>
							</div>
							
								<button 
									onClick={() => handleSignOut()} 
									className={styles.btnSignOut}>
										<VscSignOut size={20}/>
								</button>
								
					  </div>
				):(
					<button onClick={handleSignIn} className={styles.btnLogin}>Login <AiFillGoogleCircle size={20}/></button>
				)
				
				}

			</section>
		</header>
	)
}

