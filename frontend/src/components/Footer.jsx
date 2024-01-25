
function Footer() {

    //В Footer можно динамически обновлять год: new Date().getFullYear() - комментарий ревью 10пр
    let year = '2023';
    const currentYear = new Date().getFullYear();
    if (currentYear !== 2023) {
        year = `2023 - ${currentYear}`;
    }

    return(
        <footer className="footer">
            <p className="footer__copyright">© {year} Mesto Russia</p>
        </footer>
    )
}
export default Footer

