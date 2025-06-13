import { newsList } from "./NewsContent"
import './News.css'

function News () {





    return (
        <div className="news-section">
            <h1 className="news-title">Новости</h1>
            <div className="news-list">
                {newsList.map((content) => (
                    <div key={content.id} className="news-item">
                    <img src={content.img} alt="Новости" className="news-image" />
                    <a href="#"><h2 className="news-item-title">{content.title}</h2></a>
                    <p className="news-item-content">{content.description}</p>
                    <p className="news-item-date">{content.date}</p>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default News