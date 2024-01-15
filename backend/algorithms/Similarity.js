const cv = require('@u4/opencv4nodejs');
const fs = require('fs');

// 카페 정보 불러오기
const cafes = require('./assets/cafe');

// 이미지 유사도 계산 함수
function calculateSimilarity(img1, img2) {
    const grayImg1 = img1.cvtColor(cv.COLOR_BGR2GRAY);
    const grayImg2 = img2.cvtColor(cv.COLOR_BGR2GRAY);
    return cv.compareHist(grayImg1, grayImg2, cv.HISTCMP_CORREL);
}

// Function to calculate and return top 5 similarity results as JSON
function getTop5SimilarityResults(referenceImagePath) {
    const referenceImage = cv.imread(referenceImagePath);
    const similarityResults = [];

    // 특정 이미지와 모든 카페 이미지들 간의 유사도 계산
    cafes.forEach((cafe) => {
        const targetImage = cv.imread(cafe.image);
        const similarity = calculateSimilarity(referenceImage, targetImage);
        similarityResults.push({
            title: cafe.title,
            address: cafe.address,
            image: cafe.image,
            similarity: similarity
        });
    });

    // 유사도에 따라 결과 정렬 (내림차순)
    similarityResults.sort((a, b) => b.similarity - a.similarity);

    // 상위 5개 항목 추출
    const top5Results = similarityResults.slice(0, 5);

    // Convert top5Results to JSON string
    const top5ResultsJSON = JSON.stringify(top5Results, null, 2);

    return top5ResultsJSON;
}

// Example usage:
const referenceImagePath = 'path/to/referenceImage.jpg';
const top5ResultsJSON = getTop5SimilarityResults(referenceImagePath);

// Save the JSON to a file (optional)
const outputFilePath = 'path/to/top5SimilarityResults.json';
fs.writeFileSync(outputFilePath, top5ResultsJSON);

console.log('Top 5 이미지 유사도 결과:', top5ResultsJSON);
