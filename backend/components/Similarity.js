const fs = require('fs');
const cv = require('opencv4nodejs');

// 특정 이미지 파일 경로
const referenceImagePath = 'path/to/referenceImage.jpg';

// JSON 파일 경로
const jsonFilePath = 'path/to/images.json';

// JSON 파일에서 이미지 경로들을 읽어옴
const imagePaths = JSON.parse(fs.readFileSync(jsonFilePath, 'utf-8'));

// 특정 이미지 읽기
const referenceImage = cv.imread(referenceImagePath);

// 결과를 저장할 객체
const similarityResults = {};

// 이미지 유사도 계산 함수
function calculateSimilarity(img1, img2) {
    const grayImg1 = img1.cvtColor(cv.COLOR_BGR2GRAY);
    const grayImg2 = img2.cvtColor(cv.COLOR_BGR2GRAY);
    return cv.compareHist(grayImg1, grayImg2, cv.HISTCMP_CORREL);
}

// 특정 이미지와 모든 이미지들 간의 유사도 계산
imagePaths.forEach((imagePath) => {
    const targetImage = cv.imread(imagePath);
    const similarity = calculateSimilarity(referenceImage, targetImage);
    similarityResults[imagePath] = similarity;
});

// 결과를 JSON 파일로 저장
const outputFilePath = 'path/to/similarityResults.json';
fs.writeFileSync(outputFilePath, JSON.stringify(similarityResults, null, 2));

console.log('이미지 유사도 측정이 완료되었습니다.');
