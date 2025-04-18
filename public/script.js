document.querySelectorAll(".tab").forEach((tab) => {
  tab.addEventListener("click", () => {
    document.querySelectorAll(".tab").forEach((t) => t.classList.remove("active"));
    tab.classList.add("active");
  });
});

document.getElementById("generate-button").addEventListener("click", async () => {
  const title = document.getElementById("novel-title").value.trim();
  const author = document.getElementById("novel-author").value.trim();
  const selectedTab = document.querySelector(".tab.active").id;

  let prompt = "";

  switch (selectedTab) {
    case "tab-mindmap":
      prompt = `인터넷을 참고하여, 작가 '${author}'의 소설 '${title}'의 내용을 바탕으로, 주제, 인물 관계, 사건 흐름을 포함한 마인드맵을 만들어줘.`;
      break;
    case "tab-author":
      prompt = `작가 '${author}'의 생애, 문학적 특징, 대표작에 대한 소개를 작성해줘.`;
      break;
    case "tab-quotes":
      prompt = `소설 '${title}'에서 인상적인 명문장을 3개 뽑아서 간단한 해설과 함께 정리해줘.`;
      break;
    case "tab-analysis":
      prompt = `소설 '${title}'의 문학적 주제, 배경, 인물, 구성 등에 대한 비평적 분석을 작성해줘.`;
      break;
    default:
      prompt = `소설 '${title}'에 대한 정보를 알려줘.`;
  }

  console.log("📤 Sending prompt:", prompt);

  try {
    const res = await fetch("/generate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ prompt }),
    });

    console.log("📡 Response status:", res.status);

    if (!res.ok) {
      throw new Error(`❌ 서버 오류: ${res.status}`);
    }

    const data = await res.json();
    console.log("📦 Received data:", data);
    const outputText = data.result || "⚠️ 결과를 가져올 수 없습니다.";
    document.getElementById("output").textContent = outputText;
    
  } catch (err) {
    console.error("❗ Error during fetch:", err);
    document.getElementById("output").textContent = "⚠️ 생성 중 오류가 발생했습니다.";
  }
});
