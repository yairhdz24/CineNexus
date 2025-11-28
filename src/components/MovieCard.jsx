import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import FavoriteButton from './FavoriteButton';
import { CardContainer, CardBody, CardItem } from './ui/ThreeDCard';

export default function MovieCard({ movie }) {
    const hasPoster = movie.Poster && movie.Poster !== 'N/A';

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
        >
            <CardContainer className="inter-var">
                <CardBody className="bg-white dark:bg-slate-800 relative group/card dark:hover:shadow-2xl dark:hover:shadow-emerald-500/[0.1] dark:border-white/[0.2] border-black/[0.1] w-auto sm:w-[15rem] h-auto rounded-xl p-4 border transition-all duration-300 hover:border-primary-500/50">
                    <CardItem
                        translateZ="50"
                        className="w-full mt-2"
                    >
                        <Link to={`/movie/${movie.imdbID}`}>
                            <div className="aspect-[2/3] w-full overflow-hidden rounded-xl group-hover/card:shadow-xl relative">
                                {hasPoster ? (
                                    <motion.img
                                        src={movie.Poster}
                                        alt={movie.Title}
                                        className="h-60 w-full object-cover rounded-xl group-hover/card:shadow-xl"
                                        loading="lazy"
                                        whileHover={{ scale: 1.1 }}
                                        transition={{ duration: 0.3 }}
                                    />
                                ) : (
                                    <div className="w-full h-60 flex items-center justify-center bg-gradient-to-br from-slate-200 to-slate-300 dark:from-slate-700 dark:to-slate-800 text-slate-400 rounded-xl">
                                        No Poster
                                    </div>
                                )}
                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover/card:opacity-100 transition-opacity duration-300 rounded-xl" />
                            </div>
                        </Link>
                    </CardItem>

                <div className="mt-4">
                    <CardItem
                        translateZ="60"
                        className="text-lg font-bold text-neutral-600 dark:text-white line-clamp-1"
                    >
                        {movie.Title}
                    </CardItem>
                    <CardItem
                        as="p"
                        translateZ="40"
                        className="text-neutral-500 text-sm max-w-sm mt-2 dark:text-neutral-300"
                    >
                        {movie.Year} • {movie.Type}
                    </CardItem>
                    <div className="flex justify-between items-center mt-4">
                        <CardItem
                            translateZ={20}
                            as={Link}
                            to={`/movie/${movie.imdbID}`}
                            className="px-4 py-2 rounded-xl text-xs font-normal dark:text-white bg-gradient-to-r from-primary-500/10 to-purple-500/10 hover:from-primary-500/20 hover:to-purple-500/20 transition-all duration-300"
                        >
                            Ver detalles →
                        </CardItem>
                        <CardItem translateZ={20}>
                            <FavoriteButton movie={movie} className="!p-2" />
                        </CardItem>
                    </div>
                </div>
            </CardBody>
        </CardContainer>
        </motion.div>
    );
}
