const questions = [
  {
    text: "출근길에 ‘오늘은 어떤 일이 기다릴까?’보다 ‘오늘도 버텨야지’가 먼저 떠오른다.",
    options: [
      { label: "아니다, 아직 기대가 있다", value: 0 },
      { label: "그렇다, 버틴다는 생각뿐", value: 1 }
    ]
  },
  {
    text: "최근 3개월 동안 야근이나 주말 업무에 대한 거부감이 크게 늘었다.",
    options: [
      { label: "아직 감내할 만하다", value: 0 },
      { label: "이제는 손도 대기 싫다", value: 1 }
    ]
  },
  {
    text: "회의나 프로젝트 중에도 이직 사이트나 채용 공고를 습관처럼 훑어본다.",
    options: [
      { label: "가끔 참고만 한다", value: 0 },
      { label: "거의 매일 체크한다", value: 1 }
    ]
  },
  {
    text: "회사에서 성장하는 미래를 상상하면 막연하거나 공허하게 느껴진다.",
    options: [
      { label: "아직은 가능성이 보인다", value: 0 },
      { label: "상상이 안 되고 공허하다", value: 1 }
    ]
  },
  {
    text: "동료의 성과를 축하하기보다 나만 뒤처진다는 생각이 든다.",
    options: [
      { label: "동료와 함께 기뻐한다", value: 0 },
      { label: "질투와 회의감이 먼저 든다", value: 1 }
    ]
  },
  {
    text: "관리자나 회사 정책을 떠올리면 갑갑하거나 신뢰가 떨어진다.",
    options: [
      { label: "아직은 기대고 싶다", value: 0 },
      { label: "신뢰가 무너진 지 오래다", value: 1 }
    ]
  },
  {
    text: "업무 중 틈만 나면 다른 커리어를 위한 공부나 자격증을 검색한다.",
    options: [
      { label: "필요할 때만 찾아본다", value: 0 },
      { label: "사실상 주된 관심사다", value: 1 }
    ]
  },
  {
    text: "회사 메신저 알림만 울려도 심장이 철렁 내려앉는다.",
    options: [
      { label: "업무라면 당연하다고 느낀다", value: 0 },
      { label: "알림만 봐도 숨이 막힌다", value: 1 }
    ]
  },
  {
    text: "성과 피드백을 들어도 동기부여보다 피로감이 더 커진다.",
    options: [
      { label: "도움이 되고 힘이 된다", value: 0 },
      { label: "피드백이 고역처럼 느껴진다", value: 1 }
    ]
  },
  {
    text: "워라밸보다 ‘워워’와 ‘밸런스가 무너짐’을 먼저 떠올린다.",
    options: [
      { label: "그래도 균형을 유지한다", value: 0 },
      { label: "밸런스는 이미 붕괴됐다", value: 1 }
    ]
  },
  {
    text: "월급날에도 설렘보다 ‘이 정도면 다른 데 가도 되겠는데?’라는 생각이 든다.",
    options: [
      { label: "보상에 아직 만족한다", value: 0 },
      { label: "이직이 더 나을 것 같다", value: 1 }
    ]
  },
  {
    text: "업무 관련 교육이나 워크숍 소식이 와도 참여 의욕이 잘 생기지 않는다.",
    options: [
      { label: "그래도 배우고 싶다", value: 0 },
      { label: "귀찮고 무의미하게 느껴진다", value: 1 }
    ]
  },
  {
    text: "상사가 휴가를 가면 회사 분위기가 더 편안해진다고 느낀다.",
    options: [
      { label: "큰 차이는 없다", value: 0 },
      { label: "그때만 숨을 쉬는 것 같다", value: 1 }
    ]
  },
  {
    text: "퇴근 후에도 회사 이야기가 나오면 반응하기 싫어진다.",
    options: [
      { label: "그래도 이야기할 수 있다", value: 0 },
      { label: "듣기만 해도 피곤하다", value: 1 }
    ]
  },
  {
    text: "‘내가 왜 여기 있는 걸까?’라는 질문을 반복한다.",
    options: [
      { label: "가끔 흔들리지만 괜찮다", value: 0 },
      { label: "요즘 계속 그 생각뿐이다", value: 1 }
    ]
  }
];

const results = [
  {
    range: [0, 3],
    title: "여전히 활력 있는 상태",
    message: "퇴사 신호는 약한 편이에요. 지금의 장점을 더 살리고, 가끔 찾아오는 회의감은 주변과 공유하며 풀어보세요.",
    image: "assets/result-green.svg"
  },
  {
    range: [4, 7],
    title: "주의가 필요한 균열",
    message: "조심스러운 균열이 보입니다. 원인을 구체적으로 적어보고 조직 안에서 해결할 수 있는 방법을 먼저 탐색해 보세요.",
    image: "assets/result-amber.svg"
  },
  {
    range: [8, 11],
    title: "떠날 준비를 하는 마음",
    message: "이직 레이더가 활발히 작동하는 단계예요. 경력 목표를 정리하고 네트워킹, 이력서 업데이트 등 현실적인 준비를 시작해 보세요.",
    image: "assets/result-pink.svg"
  },
  {
    range: [12, 15],
    title: "이미 떠난 마음",
    message: "몸만 남은 상태에 가까워요. 심리적 소진이 크기 때문에, 휴식과 회복을 최우선으로 하고 새로운 환경을 적극적으로 탐색해 보세요.",
    image: "assets/result-red.svg"
  }
];

const landingView = document.getElementById("landing-view");
const quizView = document.getElementById("quiz-view");
const resultView = document.getElementById("result-view");
const startBtn = document.getElementById("start-btn");
const restartBtn = document.getElementById("restart-btn");
const retryBtn = document.getElementById("retry-btn");
const shareBtn = document.getElementById("share-btn");
const questionText = document.getElementById("question-text");
const answerButtons = document.querySelectorAll(".answer-btn");
const progressCount = document.getElementById("progress-count");
const progressFill = document.getElementById("progress-fill");
const resultTitle = document.getElementById("result-title");
const resultMessage = document.getElementById("result-message");
const resultImage = document.getElementById("result-image");
const toast = document.getElementById("toast");
const modal = document.getElementById("modal");
const modalMessage = document.getElementById("modal-message");
const modalClose = document.getElementById("modal-close");

const state = {
  currentIndex: 0,
  selections: [],
  score: 0
};

function showView(view) {
  [landingView, quizView, resultView].forEach((section) => {
    if (section === view) {
      section.classList.add("view--active");
    } else {
      section.classList.remove("view--active");
    }
  });
}

function updateQuestion() {
  const current = questions[state.currentIndex];
  questionText.textContent = current.text;
  answerButtons.forEach((btn, index) => {
    btn.textContent = current.options[index].label;
    btn.dataset.value = current.options[index].value;
    btn.classList.toggle(
      "selected",
      state.selections[state.currentIndex] === index
    );
  });
  progressCount.textContent = state.currentIndex + 1;
  const progressPercent = (state.currentIndex / questions.length) * 100;
  progressFill.style.width = `${progressPercent}%`;
}

function handleAnswer(choiceIndex) {
  const current = questions[state.currentIndex];
  const value = Number(current.options[choiceIndex].value);
  const previousSelection = state.selections[state.currentIndex];

  if (previousSelection !== undefined) {
    const previousValue = Number(current.options[previousSelection].value);
    state.score -= previousValue;
  }

  state.selections[state.currentIndex] = choiceIndex;
  state.score += value;

  answerButtons.forEach((btn, idx) => {
    btn.classList.toggle("selected", idx === choiceIndex);
  });

  setTimeout(() => {
    if (state.currentIndex < questions.length - 1) {
      state.currentIndex += 1;
      updateQuestion();
    } else {
      showResults();
    }
  }, 180);
}

function showResults() {
  progressFill.style.width = "100%";
  const matchedResult = results.find(({ range }) => {
    const [min, max] = range;
    return state.score >= min && state.score <= max;
  });

  if (matchedResult) {
    resultTitle.textContent = matchedResult.title;
    resultMessage.textContent = matchedResult.message;
    resultImage.src = matchedResult.image;
    resultImage.alt = matchedResult.title;
  }

  showView(resultView);
}

function resetQuiz() {
  state.currentIndex = 0;
  state.selections = [];
  state.score = 0;
  progressFill.style.width = "0%";
  progressCount.textContent = 1;
  updateQuestion();
  showView(quizView);
}

function restartApp() {
  state.currentIndex = 0;
  state.selections = [];
  state.score = 0;
  progressFill.style.width = "0%";
  progressCount.textContent = 1;
  showView(landingView);
}

function showToast(message) {
  toast.textContent = message;
  toast.classList.add("show");
  setTimeout(() => toast.classList.remove("show"), 2400);
}

function showModal(message) {
  modalMessage.textContent = message;
  modal.setAttribute("aria-hidden", "false");
}

function closeModal() {
  modal.setAttribute("aria-hidden", "true");
}

async function shareResult() {
  const resultTitleText = resultTitle.textContent;
  const shareUrl = new URL(window.location.href);
  shareUrl.searchParams.set("result", resultTitleText);

  const shareData = {
    title: "퇴사 신호 자가 진단 결과",
    text: `${resultTitleText}\n나의 퇴사 신호는 어느 단계일까요?`,
    url: shareUrl.toString()
  };

  if (navigator.share) {
    try {
      await navigator.share(shareData);
      showToast("공유가 완료되었어요!");
    } catch (error) {
      if (error.name !== "AbortError") {
        showModal("공유가 취소되었어요. 다른 방법을 시도해 보세요.");
      }
    }
    return;
  }

  try {
    if (!navigator.clipboard) {
      throw new Error("clipboard-unavailable");
    }
    await navigator.clipboard.writeText(shareData.url);
    showToast("링크가 클립보드에 복사되었어요!");
  } catch (error) {
    showModal("클립보드 접근이 거부되었어요. 수동으로 복사해 주세요.");
  }
}

startBtn.addEventListener("click", resetQuiz);

answerButtons.forEach((button, index) => {
  button.addEventListener("click", () => handleAnswer(index));
});

restartBtn.addEventListener("click", restartApp);
retryBtn.addEventListener("click", resetQuiz);
shareBtn.addEventListener("click", shareResult);
modalClose.addEventListener("click", closeModal);
modal.addEventListener("click", (event) => {
  if (event.target === modal) {
    closeModal();
  }
});

// Initialize with landing view state
showView(landingView);
