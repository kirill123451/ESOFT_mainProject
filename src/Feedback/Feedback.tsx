import './Feedback.css';

function Feedback () {
  return (
    <div className="feedback-container">
      <div className="background-image"></div>
      
      <div className="feedback-card">
        <h1 className="feedback-title">Обратная связь</h1>
        <p className="feedback-subtitle">
          Поделитесь мнением о нашей работе или задайте нам любой интересующий вас вопрос в поле комментарий
        </p>
        
        <form className="feedback-form">
          <div className="form-group">
            <input type="text" id="name" name="name" placeholder=" " />
            <label htmlFor="name">Имя</label>
          </div>
          
          <div className="form-group">
            <input type="text" id="surname" name="surname" placeholder=" " />
            <label htmlFor="surname">Фамилия</label>
          </div>
          
          <div className="form-group">
            <input type="tel" id="phone" name="phone" placeholder=" " />
            <label htmlFor="phone">Телефон</label>
          </div>
          
          <div className="form-group">
            <input type="email" id="email" name="email" placeholder=" " />
            <label htmlFor="email">E-mail</label>
          </div>
          
          <div className="form-group">
            <textarea id="comment" name="comment" rows={4} placeholder=" "></textarea>
            <label htmlFor="comment">Комментарий</label>
          </div>
          
          <button type="submit" className="submit-button">
            Отправить
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        </form>
      </div>
    </div>
  );
};

export default Feedback;