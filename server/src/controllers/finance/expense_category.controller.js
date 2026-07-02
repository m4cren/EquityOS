import { supabaseFromReq } from "../../lib/supabaseFromReq.js";
export const fetchExpenseCategory = async (req, res) => {
    const supabase = supabaseFromReq(req);
    const { data, error } = await supabase.from("expense_category").select("*");
    if (!error) {
        return res.json(data);
    }
};
export const addNewExpenseCategory = async (req, res) => {
    const supabase = supabaseFromReq(req);
    const body = req.body;
    const { data, error } = await supabase
        .from("expense_category")
        .insert(body)
        .select()
        .single();
    if (error) {
        console.log(error);
    }
    return res.json(body);
};
export const deleteExpenseCategory = async (req, res) => {
    const supabase = supabaseFromReq(req);
    const body = req.body;
    const { data, error } = await supabase
        .from("expense_category")
        .delete()
        .eq("id", body.id)
        .eq("label", body.label)
        .select()
        .single();
    return res.status(201).json(data);
};
export const editExpenseCategory = async (req, res) => {
    const supabase = supabaseFromReq(req);
    const body = req.body;
    console.log(body);
    const { data, error } = await supabase
        .from("expense_category")
        .update({
        label: body.newLabel,
        icon: body.newIcon,
        alloc_per_month: body.newAlloc_per_month,
        alloc_per_year: body.newAlloc_per_year,
    })
        .eq("id", body.id)
        .select()
        .single();
    if (error)
        return res.status(400).json({ error });
    return res.json(data);
};
//# sourceMappingURL=expense_category.controller.js.map