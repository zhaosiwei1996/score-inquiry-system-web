document.addEventListener("DOMContentLoaded", function () {
    const getScoreForm = document.getElementById("getScoreForm");
    const resultDiv = document.getElementById("resultDiv");
    getScoreForm.addEventListener("submit", async function (e) {
        e.preventDefault();
        // 学生IDの入力を取得
        const studentid = document.getElementById("studentid").value;

        try {
            // /api/getscoreにPOSTリクエストを送信
            const response = await fetch("/api/getscore", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ "studentid": studentid }),
            });
            if (!response.ok) {
                throw new Error("HTTPエラー: " + response.status);
            }
            const data = await response.json();
            // レスポンスデータを処理し、結果のdivに表示
            const result = data.data[0];
            console.log(result);
            const htmlString = `
                <p>学生ID: ${studentid}</p>
                <p>学生の名前: ${result.studentname}</p>
                <p>学生番号: ${result.studentnumber}</p>
                <p>数学: ${result.mathematics}</p>
                <p>国語: ${result['mother-tongue']}</p>
                <p>英語: ${result.english}</p>
                <p>物理: ${result.physics}</p>
                <p>化学: ${result.chemistry}</p>
                <p>生物: ${result.biology}</p>
            `;
            resultDiv.innerHTML = htmlString;
        } catch (error) {
            console.error("エラー：", error);
            resultDiv.innerHTML = "<p>成績の取得中にエラーが発生しました。</p>";
        }
    });
});
