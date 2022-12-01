import React from 'react';
import StatisticLevel from './StatisticLevel';

interface trending_level {
    id: any,
    pronunciation_course_level: string,
    participant_quantity: number,
}
interface typeProps {
    trending_level: trending_level[] | null,
    loading: boolean,
    error: string

}
const TrendingLevel = (props: typeProps) => {
    const { trending_level, loading, error } = props

    if (loading) {
        return (
            <div>

            </div>
        )
    }
    else if (error || !trending_level) {
        return (
            <div>
                <p className='text-red-500 font-semibold text-center text-lg my-5'>{error || 'Lỗi không xác định trong quá trình thống kê xu hướng'}</p>
            </div>
        )
    }
    return (
        <div>
            <h2 className='font-bold text-xl mb-10'>Xu hướng lựa chọn trình độ khóa học</h2>
            <div className='w-full sm:w-3/5 h-[400px] mx-auto'>
                <StatisticLevel
                    all_level={trending_level.find((trending: trending_level) => trending.pronunciation_course_level === 'all')?.participant_quantity || 0}
                    beginner={trending_level.find((trending: trending_level) => trending.pronunciation_course_level === 'beginner')?.participant_quantity || 0}
                    intermediate={trending_level.find((trending: trending_level) => trending.pronunciation_course_level === 'intermediate')?.participant_quantity || 0}
                    upper_intermediate={trending_level.find((trending: trending_level) => trending.pronunciation_course_level === 'upper intermediate')?.participant_quantity || 0}
                    advanced={trending_level.find((trending: trending_level) => trending.pronunciation_course_level === 'advanced')?.participant_quantity || 0}
                />
            </div>
        </div>

    );
};

export default TrendingLevel;