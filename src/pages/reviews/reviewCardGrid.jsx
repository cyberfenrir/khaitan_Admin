import React from 'react';
import ReviewCard from './reviewCard';

const reviewData = [
  {
    review: {
      location: "U.S.A",
      date: "21 December 2023",
      content: "I recently purchased a t-shirt that I was quite excited about, and I must say, there are several aspects that I really appreciate about it. Firstly, the material is absolutely wonderful.",
      rating: "1",
      quality: "Excellent Quality"
    },
    reviewer: {
      name: "Michael B. Coch",
      title: "Kaika Hill, CEO / Hill & CO",
      avatarSrc: "https://cdn.builder.io/api/v1/image/assets/TEMP/d35b4c9796332fdf0d7f57ecd2304e5a1291e75133f331679946b2d3d65ebc78?placeholderIfAbsent=true&apiKey=28f7b481badb46ef8aa0de3f5eef14c9",
      badgeSrc: "https://cdn.builder.io/api/v1/image/assets/TEMP/187922b8025cd9ec36168ac69e4e9f20ce1fbf2c5a6dc274f84b0791ba6fb40c?placeholderIfAbsent=true&apiKey=28f7b481badb46ef8aa0de3f5eef14c9"
    }
  },
  {
    review: {
      location: "Canada",
      date: "16 March 2023",
      content: "I purchased a pair of jeans Firstly, the fabric is fantastic—it's both durable and comfortable. The denim is soft yet sturdy, making it perfect for everyday wear.",
      rating: "4",
      quality: "Best Quality"
    },
    reviewer: {
      name: "Theresa T. Brose",
      title: "Millenia Life, / General internist",
      avatarSrc: "https://cdn.builder.io/api/v1/image/assets/TEMP/a2b0d7e84e1695560b875dc1c6616f984c48fc877122a2eb5815e6080de02d70?placeholderIfAbsent=true&apiKey=28f7b481badb46ef8aa0de3f5eef14c9",
      badgeSrc: "https://cdn.builder.io/api/v1/image/assets/TEMP/bedd0c4b43488cec54469f91ea21395d58df35d770c594d538024e41dc81acd6?placeholderIfAbsent=true&apiKey=28f7b481badb46ef8aa0de3f5eef14c9"
    }
  },
  {
    review: {
      location: "Germany",
      date: "23 October 2023",
      content: "The fit is perfect, hugging in all the right places while allowing for ease of movement. Overall, this dress exceeded my expectations and has quickly become a favorite in my wardrobe.",
      rating: "7",
      quality: "Good Quality"
    },
    reviewer: {
      name: "James L. Erickson",
      title: "Omni Tech Solutions / Founder",
      avatarSrc: "https://cdn.builder.io/api/v1/image/assets/TEMP/2656a3ee699c362e09647754db4c125a176d8e25ab1d62cd30349a79deff16b3?placeholderIfAbsent=true&apiKey=28f7b481badb46ef8aa0de3f5eef14c9",
      badgeSrc: "https://cdn.builder.io/api/v1/image/assets/TEMP/187922b8025cd9ec36168ac69e4e9f20ce1fbf2c5a6dc274f84b0791ba6fb40c?placeholderIfAbsent=true&apiKey=28f7b481badb46ef8aa0de3f5eef14c9"
    }
  },
  {
    review: {
      location: "Germany",
      date: "23 October 2023",
      content: "The fit is perfect, hugging in all the right places while allowing for ease of movement. Overall, this dress exceeded my expectations and has quickly become a favorite in my wardrobe.",
      rating: "4",
      quality: "Good Quality"
    },
    reviewer: {
      name: "Lily W. Wilson",
      title: "Grade A Investment / Manager",
      avatarSrc: "https://cdn.builder.io/api/v1/image/assets/TEMP/034e1eefedcdd801509ef6f1001e42a5bde43ed6c472f50dbbee73f778faa657?placeholderIfAbsent=true&apiKey=28f7b481badb46ef8aa0de3f5eef14c9",
      badgeSrc: "https://cdn.builder.io/api/v1/image/assets/TEMP/bedd0c4b43488cec54469f91ea21395d58df35d770c594d538024e41dc81acd6?placeholderIfAbsent=true&apiKey=28f7b481badb46ef8aa0de3f5eef14c9"
    }
  },
  {
    review: {
      location: "Canada",
      date: "29 May 2023",
      content: "Additionally, the fit is perfect, providing great support and comfort for all-day wear. These boots have quickly become a staple in my wardrobe, and I couldn't be happier with my purchase.",
      rating: "10",
      quality: "Excellent Quality"
    },
    reviewer: {
      name: "Sarah M. Brooks",
      title: "Metro / Counseling",
      avatarSrc: "https://cdn.builder.io/api/v1/image/assets/TEMP/8c8a75ed3cc7990398744e878e5169884a05cd835f17cdf0df7717350f820836?placeholderIfAbsent=true&apiKey=28f7b481badb46ef8aa0de3f5eef14c9",
      badgeSrc: "https://cdn.builder.io/api/v1/image/assets/TEMP/dfe165442f6259aad31de494b909737ae2e054f50dbd7a11768e2ecccc8ef036?placeholderIfAbsent=true&apiKey=28f7b481badb46ef8aa0de3f5eef14c9"
    }
  },
  {
    review: {
      location: "U.S.A",
      date: "18 August 2023",
      content: "The color is rich and vibrant, making it a standout piece in my wardrobe. Overall, this sweater has exceeded my expectations and has quickly become one of my favorite pieces to wear.",
      rating: "13",
      quality: "Best Quality"
    },
    reviewer: {
      name: "Joe K. Hall",
      title: "Atlas Realty / Media specialist",
      avatarSrc: "https://cdn.builder.io/api/v1/image/assets/TEMP/962f61df970ab87950890eae53b9e13a0b08038d29bde0c25135284aaa241419?placeholderIfAbsent=true&apiKey=28f7b481badb46ef8aa0de3f5eef14c9",
      badgeSrc: "https://cdn.builder.io/api/v1/image/assets/TEMP/ca1455601e899f97ec6549beaf54c4a7c90eb9f4e80f999140f004e1861a4611?placeholderIfAbsent=true&apiKey=28f7b481badb46ef8aa0de3f5eef14c9"
    }
  },
  {
    review: {
      location: "Iceland",
      date: "12 May 2023",
      content: "I ordered my usual size, but the shoes are either too small or too big, making them uncomfortable to wear. I would not recommend them to others not buy product, I couldn't be happier with my purchase",
      rating: "16",
      quality: "Bad Quality"
    },
    reviewer: {
      name: "Jennifer Schafer",
      title: "Red Bears Tavern / Director",
      avatarSrc: "https://cdn.builder.io/api/v1/image/assets/TEMP/85fcd096b096d747df542a249944e50ab472e3f1c0a85ac6184ee17f8859c2a5?placeholderIfAbsent=true&apiKey=28f7b481badb46ef8aa0de3f5eef14c9",
      badgeSrc: "https://cdn.builder.io/api/v1/image/assets/TEMP/dfe165442f6259aad31de494b909737ae2e054f50dbd7a11768e2ecccc8ef036?placeholderIfAbsent=true&apiKey=28f7b481badb46ef8aa0de3f5eef14c9"
    }
  },
  {
    review: {
      location: "Arabic",
      date: "18 September 2023",
      content: "irstly, the quality of the fabric is exceptional. It's soft, luxurious, and drapes beautifully, giving the dress an elegant and sophisticated look. The design is simply stunning I couldn't be happier with my purchase.",
      rating: "18",
      quality: "Best Quality"
    },
    reviewer: {
      name: "Nashida Ulfah",
      title: "Platinum Interior / Manager",
      avatarSrc: "https://cdn.builder.io/api/v1/image/assets/TEMP/b415e78c7996f21b3e211002361bc4f59798ad96e3cdbb3ea9da290c652fce45?placeholderIfAbsent=true&apiKey=28f7b481badb46ef8aa0de3f5eef14c9",
      badgeSrc: "https://cdn.builder.io/api/v1/image/assets/TEMP/ca1455601e899f97ec6549beaf54c4a7c90eb9f4e80f999140f004e1861a4611?placeholderIfAbsent=true&apiKey=28f7b481badb46ef8aa0de3f5eef14c9"
    }
  }
];

const ReviewCardGrid = () => {
  return (
    <section className="flex flex-col">
      <div className="flex flex-col w-full max-md:max-w-full">
        <div className="w-full max-md:max-w-full">
          <div className="flex gap-5 max-md:flex-col">
            {reviewData.map((item, index) => (
              <div key={index} className="flex flex-col w-3/12 max-md:ml-0 max-md:w-full">
                <ReviewCard review={item.review} reviewer={item.reviewer} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ReviewCardGrid;