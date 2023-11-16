import Head from 'next/head'
import Image from 'next/image'
import styles from '../../styles/home.module.css'
import Logo from '../../public/assets/logo2.png'
import { Waves } from '../components/waves'

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>BoardTarefa</title>
      </Head>

      <main className={styles.main}>
        <div className={styles.logoContent}>
          <Image 
            className={styles.logo} 
            alt='logo' 
            src={Logo} 
            priority/>
        </div>
        <h2 className={styles.title}>Sistema feito para você organizar </h2>
        <h2 className={styles.title}>seus estudos e tarefas</h2>
        
        <div className={styles.infoContent}>
            <section className={styles.box}><span>+12 posts</span></section>
            <section className={styles.box}><span>+90 comentários</span></section>
        </div>
      </main>
     <Waves/>
   </div>

  )
}
