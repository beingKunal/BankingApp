import styles from './NotFound.module.css'
import image from '../../Assets/404.png'
const NotFound = (props)=>{
    return (
      <div className={styles.image404}>
            <img src={image} width="100%" height="100%" alt ="Page not found" />
            </div>
   
    )
}
export default NotFound ;