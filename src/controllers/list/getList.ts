// modal
import ListModal from "@/models/List";

const getList = async (kanbanId: string) => {
  // 用 order 排序
  const lists = await ListModal.find({ kanbanId }).sort("order");

  return lists;
}

export default getList