import css from './LoadMoreBtn.module.css';
import { LoadMoreBtnProps } from './LoadMoreBtn.types';

export default function LoadMoreBtn({ onLoadMore }: LoadMoreBtnProps) {  
  return (
    <button className={css.loadMoreBtn} type="button" onClick={onLoadMore}>
      Load more
    </button>
  );
}