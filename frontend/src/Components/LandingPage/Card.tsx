interface CardProps{
    img: string;
    genre: string;
}
function Card({img, genre}: CardProps) {
    return (
					<div className="relative ">
						<img src={img} alt="" className="w-64 h-96 object-cover" />
						<div className="absolute bottom-0 left-0 right-0 py-2 flex justify-center items-center bg-background bg-opacity-90">
							<span className="text-text text-2xl 3xl:text-3xl font-poppins font-semibold  ">
								{genre}
							</span>
						</div>
					</div>
				);
}

export default Card;