import './Footer.css';

function Footer () {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-copyright">
          © 2025 ООО «ЕВГЕНИЯ».<br />
          Адрес для направления юридически значимых сообщений: Evgenia@gmail.com<br />
          Все права защищены. «Евгения» является зарегистрированным Товарным знаком Sport & Fashion Management Pte Ltd
        </div>
        
        <div className="footer-disclaimer">
          На информационном ресурсе применяются Рекомендательные технологии (Информационные технологии предоставления 
          информации на основе сбора, систематизации и анализа сведений, относящихся к предпочтениям пользователей 
          ысети интернет, находящихся на территории Российской Федерации)
        </div>
      </div>
    </footer>
  );
};

export default Footer;