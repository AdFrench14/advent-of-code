 //Link to the problem we are trying to solve: https://adventofcode.com/2021/day/1

use std::fs;

fn main() {
    let input = read_text_file("./input.txt").unwrap(); //todo fix unwrap
    let depths = parse_input_string(input);
    println!("Number of Depth Increases: {:?}", count_increases(&depths));
    println!("Number of Depth Increases (3 depth sliding average): {:?}", count_increases(&calculate_sliding_average(&depths, 3)));
}
fn read_text_file(file_path: &str) -> Result<String, std::io::Error> {
   return fs::read_to_string(file_path)
}

fn parse_input_string(input: String) -> Vec<isize> {
    return input.split("\n")
        .map(|x| x.parse::<isize>().unwrap()) //parse to int
        .collect();
}

fn count_increases(depths: &Vec<isize>) -> usize {
    return depths.iter()
        .enumerate()
        .filter(|&(idx, val)| { 
            //Safe vector access
            let temp_val = depths.get(idx + 1);
            let next_ele = match temp_val {
                Some(val) => val,
                None => return false //filter out if can't access the next element
            };

            val < next_ele
        })
        .count();
}

fn calculate_sliding_average(depths: &Vec<isize>, sliding_avg_size: usize ) -> Vec<isize>{
    if sliding_avg_size > depths.len() {
        //TODO this should actually return Result
        panic!("You can't take a sliding average of {} elements when your Vec is only {} elements long!", sliding_avg_size, depths.len());
    }

    return depths.iter()
        .enumerate()
        .map(|(idx, _val)| -> Option<isize> {

            let mut sum = 0;

            for i in 0..sliding_avg_size {
                let temp_val = match depths.get(idx + i) {
                    Some(val) => val,
                    None => return None
                };

                sum += temp_val;
            }

            return Some(sum);
        })
        .filter(|x|x.is_some())
        .map(|x| x.unwrap())
        .collect();
}