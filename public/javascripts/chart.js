let ctx = document.getElementById("example").getContext('2d')
let example = new Chart(ctx, {
        // 參數設定[註1]
        type: "bar", // 圖表類型
        data: {
            labels: ["Red", "Green", "Blue"], // 標題
            datasets: [{
                label: "# of Votes", // 標籤
                data: [12, 19, 3], // 資料
                backgroundColor: [ // 背景色
                    "#FF0000",
                    "#00FF00",
                    "#0000FF",
                ],
                borderWidth: 1 // 外框寬度
            }]
        }
    })
