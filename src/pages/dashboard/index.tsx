import React, { ChangeEvent, FormEvent, useEffect, useState } from "react"
import styles from './styles.module.css'
import Head from "next/head"

import Link from "next/link"
import { Textarea } from "../../components/textarea"
import {LuShare2, LuTrash} from 'react-icons/lu'
import {BsFillClipboardCheckFill} from 'react-icons/bs'
import {BiTaskX} from 'react-icons/bi'
import {ImFileEmpty} from 'react-icons/im'
import { GetServerSideProps } from "next"
import { getSession } from "next-auth/react"
import { db } from "../../services/firebaseConnection"
import { addDoc, collection, deleteDoc, doc, onSnapshot, orderBy, query, where } from "firebase/firestore"
import {toast} from 'react-toastify'


interface DashboardProps {
	user:{
		email: string
	}
}
interface TaskProps {
	id: string;
	created: Date;
	public: boolean;
	tarefa:string;
	user: string;
}
export default function Dashboard({user}: DashboardProps){
	const [publicTask, setPublicTask] = useState(false);
	const [input, setInput] = useState('');
	const [getListTasks, setGetListTasks] = useState<TaskProps[]>([])

	useEffect(() => {
		async function getTasks() {
			const response = (collection(db, 'tasks'))
			const q = query(
				response,
				orderBy('created','desc'),
				where('user', '==', user?.email)
			)
			onSnapshot(q, (snapshot) => {
					let list = [] as TaskProps[];

					snapshot.forEach((doc) => {
						list.push({
							id:doc.id,
							tarefa: doc.data().tarefa,
							created: doc.data().created,
							user: doc.data().user,
							public:doc.data().public,
						}

						)
					})
					console.log(list)
					setGetListTasks(list)
			});
		
		}
		getTasks()
	},[user?.email])


	// checkbox
	function handleCheckbox(e:ChangeEvent<HTMLInputElement>){
		console.log(e.target.checked)
		setPublicTask(e.target.checked)
	}

	// send task
	async function handleRegisterTask(e:FormEvent){
		e.preventDefault()
		if(input === ''){

			return 	toast.warn('Preencha o formulário da tarefa!');
		} 

		try {
			await addDoc(collection(db,'tasks'),{
				tarefa:input,
				created: new Date(),
				user:user.email,
				public:publicTask
			})
			toast.success('Tarefa enviada com sucesso!');
			setInput('');
			setPublicTask(false)
		} catch (error) {
			console.log(error)
		}
	}

	// share task
	async function  handleShare(id:string){
		await navigator.clipboard.writeText(
			`${process.env.NEXT_PUBLIC_URL}${id}`
		)
	}

	// remove task
	async function handleDelete(id:string) {
		const docRef = doc(db,'tasks', id)
		await deleteDoc(docRef)
		toast.success('Tarefa removida!');	
	}
 
	return(
		<div className={styles.container}>
			<Head>
				<title>Meu Painel</title>
			</Head>
			
			<main className={styles.main}>
				<section className={styles.content}>
				
					<div className={styles.formTask}>
						<h1>Informe a tarefa</h1>
						<form onSubmit={handleRegisterTask}>
							<Textarea 
								placeholder="Digite uma tarefa"
								value={input}
								onChange={(e:ChangeEvent<HTMLTextAreaElement>) => setInput(e.target.value)}
							/>
							<div className={styles.checkboxAREA}>
								<input 
									type="checkbox"
									checked={publicTask} 
									onChange={handleCheckbox}
									className={styles.checkbox}/>
								<label>Deixar a tarefa pública?</label>
							</div>
							<button type="submit" className={styles.buttonSubmit}>Registrar</button>
						</form>

					</div>
				</section>

				<section className={styles.tasksContainer}>
					<h1>Minhas tarefas</h1>

					{getListTasks.length  === 0 ? (
						<article className={styles.notFoundTask}>
									<ImFileEmpty size={50} color="#d3d3d350"/>
									<p>Você ainda não registrou tarefas</p>
						</article>	
					):(
					getListTasks.map((item) => (
					  
						<article key={item.id} className={styles.containerCardTask}>
						<div className={styles.tagContainer}>
							
							{item.public ? (
								<>
									<BsFillClipboardCheckFill size={15} color="#2EE7DB"/> 
									<label className={styles.tag}>Pública</label>
								</>
								):(
									<>
									<BiTaskX size={15} color="#F24747"/>
									<label className={styles.tag}>Privada</label>
									</>
								)}					
						</div>
						
						<div className={styles.taskContent}>
							{item.public ? (
								<Link href={`${process.env.NEXT_PUBLIC_URL}/task/${item.id}`}>
										<p>{item.tarefa}</p>	
								</Link>
							):(
								 <p>{item.tarefa}</p>	
							)}
						
							
								{item.public ? (
								<div className={styles.ActionBtnRemoveOrShere}>
										<LuShare2 className={styles.shareBtn} onClick={() => handleShare(item.id)} />
										<LuTrash onClick={() => handleDelete(item.id)} className={styles.trashBtn} size={20}/>
								</div>
								):(
									<div className={styles.ActionBtnRemoveOrShere}>
									<LuTrash onClick={() => handleDelete(item.id)} className={styles.trashBtn} size={20}/>		
									</div>
								)}			
						</div>
					</article>
					)))}
					
				</section>
			</main>
		</div>
	)
}

export const getServerSideProps: GetServerSideProps = async ({req}) => {
	const session = await getSession({req})
	console.log(session)

  if(!session?.user){
		return{
			redirect:{
				destination:'/',
				permanent:false
			}
		}
	}

	return {
		props:{ 
			user :{
				email: session?.user?.email,
			}
		}
	}
}