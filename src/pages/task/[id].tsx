import Head from "next/head";
import styles from "./styles.module.css"

import {toast} from 'react-toastify'
import { GetServerSideProps } from "next";
import { db } from "../../services/firebaseConnection";
import {doc, query, where, collection, getDoc, addDoc, getDocs, deleteDoc} from 'firebase/firestore'
import { useSession } from "next-auth/react";
import { Textarea } from "../../components/textarea";
import { ChangeEvent, FormEvent, FormEventHandler, useState } from "react";
import { LuTrash } from "react-icons/lu";
import { MdBlock } from "react-icons/md";

interface TasksProps{
	item:{
		taskid:string,
		tarefa:string,
		user:string,
		created: string,
		public: boolean
	}
	allComments: CommentsProps[]
}

interface CommentsProps{
	id:string,
	taskId:string,
	comment:string,
	user:string,
	name: string,
  avatar: string,
}

export default function Task({item, allComments}:TasksProps){
	const {data:session} = useSession()
	const [comments, setComment] = useState('')
	const [allCommentsUser, setAllCommentsUser] = useState<CommentsProps[]>(allComments || [])

	const handleComment: FormEventHandler<HTMLFormElement> = async (e: FormEvent<HTMLFormElement>) =>{
		e.preventDefault()

		if(comments === ''){
			return toast.warn('Preencha o formulário do cometário!')
		}

		if(!session?.user?.email || !session.user?.name){
			return
		}

		try {
			const docRef = await addDoc(collection(db,'comments'),{
				comment: comments,
				created: new Date(),
				name: session?.user?.name,
				user: session?.user?.email,
				avatar: session?.user.image,
				taskId: item?.taskid
			})

			const data = {
				id: docRef.id,
				comment: comments,
				user: session?.user?.email,
				name: session?.user?.name,
				avatar: session?.user?.image,
				taskId: item?.taskid,
			}

			setAllCommentsUser((oldItems) => [...oldItems, data])

      toast.success('Comentário enviando com sucesso!')
			setComment('')
			
		} catch (error) {
			console.log(error)
			alert(error)
		}

}

async function handleDelete(id:string) {
	try {
		const docRef = doc(db, 'comments', id)
		await deleteDoc(docRef)
		const deleteItem = allComments.filter((item) => item.id !== id)
		setAllCommentsUser(deleteItem)

		toast.success('Tarefa removida!')
	} catch (error) {
		toast.error('Ops, Algo deu errado!')
	}
}

	return(
		<div className={styles.container}>
			<Head>
				<title>Detalhes da tarefa</title>
			</Head>

			<main className={styles.main}>
				<h1>Tarefa</h1>
				<div className={styles.autorTask}>

				</div>
				<article className={styles.tasks}>
					<p>{item.tarefa}</p>
				</article>
			</main>

			<section className={styles.commentsContainer}>
				<form onSubmit={handleComment}>
					<h2>Enviar um comentário</h2>
					<Textarea 
						placeholder="Digite o seu comentário..."
						value={comments}
						onChange={(e:ChangeEvent<HTMLTextAreaElement>) => setComment(e.target.value)}
					/>
					<button type="submit" disabled={!session?.user} className={styles.button}>Comentar</button>
				</form>
				
			</section>

			<section className={styles.commentsContainer}>
					<h2>Todos os comentários</h2>
					{allCommentsUser.length === 0 && <p>Nunhum comentário</p>}

					<article className={styles.comments}>
						{allCommentsUser.map((item) => (
							// eslint-disable-next-line react/jsx-key
							<div className={styles.commentContent}>
								<div className={styles.containerUserComment}>
										<img src={item.avatar} alt="avatarUrl" className={styles.avatarComment}/>
										<h4>{item.name}</h4>
								</div>
								<div className={styles.commentUser}>
										<p key={item.id}>{item?.comment}</p>
								</div>
								<div className={styles.acitonsBtns}>
								  {item.user === session?.user?.email ? (
											<LuTrash  onClick={() => handleDelete(item.id)} className={styles.trashBtn} size={20}/>		
									):(
										<MdBlock size={20} className={styles.btnBlock}/>
									)}
								</div>
								
							</div>
								)
						)}		
					</article>
			</section>
		</div>
	)

}

export const getServerSideProps: GetServerSideProps = async ({params}) => {
	const id = params?.id as string
 // buscando comments
	const q = query(collection(db,'comments'), where('taskId', '==', id))

	const snapshotComments = await getDocs(q)

	let allComments: CommentsProps[] = []
	snapshotComments.forEach((doc) => {
		allComments.push({
			id:doc.id,
			comment: doc.data().comment,
			user: doc.data().user,
			name: doc.data().name,
			avatar: doc.data().avatar,
			taskId: doc.data().taskId,
		})
	})

	console.log(allComments)
  
	const docRef = doc(db, 'tasks', id)

	const snapshot = await getDoc(docRef)

	if(snapshot.data() === undefined){
		return{
			redirect:{
				destination:'/',
				permanent:false
			}
		}
	}

	if(!snapshot.data()?.public){
		return{
			redirect:{
				destination:'/',
				permanent:false
			}
		}
	}

	const miliseconds = snapshot.data()?.created?.seconds * 1000

	const task = {
		tarefa: snapshot.data()?.tarefa,
		public: snapshot.data()?.public,
		user: snapshot.data()?.user,
		created: new Date(miliseconds).toLocaleDateString(),
		taskid:id
	}

	return{
		props:{item:task, allComments: allComments}
	}
}